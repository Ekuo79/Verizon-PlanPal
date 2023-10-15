import { useEffect, useState, useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Avatar, Box, Button, Container, Divider, FormControl, InputAdornment, InputLabel, List, ListItem, ListItemAvatar,
  ListItemText, OutlinedInput, Paper, TextField, Typography, Fade, Grow
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SkeletonGroup from '../../components/SkeletonGroup/SkeletonGroup';
import ReactDOMConfetti from 'react-dom-confetti';
import axios from '../../apis/backend';

const Chat = () => {

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(true);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [currMsg, setCurrMsg] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const [isConfettiActive, setConfettiActive] = useState(false);

  const displayConfetti = () => {
    setConfettiActive(true);
    // Optionally, turn off confetti after a timeout if desired
    setTimeout(() => setConfettiActive(false), 5000);
  };

  const chatHisRef = useRef(null);

  const assistant = useSelector((state) => state.chat.assistant);

  const handleSetAssistant = async () => {
    try {
      const response = await axios.post('/assistant', {
        assistant
      });
      setChatHistory(prevState => [...prevState, response?.data]);
    } catch (error) {
    } finally {
      setGenerating(false);
    }
  };

  const handleSendMessage = async () => {
    const prompt = message.trim();
    if (prompt) {
      setGenerating(true);
      setChatHistory(prevState => [...prevState, { 'role': 'User', content: prompt }]);
      setCurrMsg(prompt);
      try {
        const response = await axios.post('/chat', { assistant, prompt });
        setChatHistory(prevState => [...prevState, response?.data]);
        setMessage('');
        if (response.data.confirmed) {
          displayConfetti();
        } else {
          setCurrMsg(null);
        }
      } catch (error) {
        setCurrMsg(null);
      } finally {
        setGenerating(false);
      }
    }
  };

  const handleSwitchAssistant = () => {
    navigate('/new');
  };

  useEffect(() => {
    if (!assistant) navigate('/new');
    handleSetAssistant();
  }, []);

  useEffect(() => {
    const element = chatHisRef.current;
    element.scrollTop = element.scrollHeight;
  }, [chatHistory]);

  return (
    <div className='GenericPage'>
      <Header />
      <main>
        <Box>
          <Container maxWidth="lg">
            <Box className="GenericPage__container_title_box GenericPage__container_title_flexBox GenericPage__container_title_flexBox_left">
              <Box className="GenericPage__container_title_flexBox GenericPage__container_title_flexBox_left">
                <Typography variant="h1">{`Chat with ${assistant}`}</Typography>
                <Button onClick={() => handleSwitchAssistant()} size="medium" sx={{ 'margin-left': '23px' }}>Switch</Button>
              </Box>
              <Box className="GenericPage__container_title_flexBox GenericPage__container_title_flexBox_right" sx={{ 'flex-grow': '1' }}>
                <Box className="GenericPage__container_title_flexBox_right">
                  {/* <Button onClick={() => displayConfetti()} variant="contained" size="medium">Button</Button> */}
                </Box>
              </Box>
            </Box>
          </Container>
          <Container maxWidth="lg">
            <Paper className='GenericPage__container_paper' variant='outlined'>
              {(loading) ?
                (
                  <Box>
                    <SkeletonGroup />
                    <SkeletonGroup />
                    <SkeletonGroup />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '75vh',
                      maxWidth: '700px',
                      margin: '0 auto',
                      paddingTop: '20px'
                    }}
                  >
                    <ReactDOMConfetti config={confettiConfig} active={isConfettiActive} />
                    {/* Chat History */}
                    <Box
                      ref={chatHisRef}
                      sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        p: 2
                      }}
                    >
                      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {chatHistory.map((msg, index) => {
                          return (
                            <Box key={index} sx={{ bgcolor: msg.role === 'User' ? 'white' : 'rgb(247, 247, 248)' }}>
                              <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                                <ListItemAvatar>
                                  <Avatar src={msg.role === 'User' ? `` : `https://verizon-chatbot-dev.s3.us-east-1.amazonaws.com/${msg.role.replace(/\s+/g, '').toLocaleLowerCase()}.jpg`} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.4' }} >
                                      {msg.content}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                              <Divider variant="inset" component="li" />
                            </Box>
                          )
                        })}
                        {generating && (
                          <Box sx={{ bgcolor: 'rgb(247, 247, 248)' }}>
                            <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
                              <ListItemAvatar>
                                <Avatar src={`https://verizon-chatbot-dev.s3.us-east-1.amazonaws.com/${assistant.replace(/\s+/g, '').toLocaleLowerCase()}.jpg`} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.4' }} >
                                    <SkeletonGroup />
                                  </Typography>
                                }
                              />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </Box>
                        )}
                      </List>
                    </Box>

                    {/* Input Area */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px'
                      }}
                    >
                      <Grow in={true} timeout={1000}>
                        <FormControl disabled={currMsg !== null} fullWidth variant="outlined">
                          <OutlinedInput
                            fullWidth
                            variant="outlined"
                            placeholder="Send a message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                handleSendMessage();
                                e.preventDefault();  // prevent the default action (new line) from being performed
                              }
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <LoadingButton onClick={handleSendMessage} loading={currMsg !== null} disabled={!message.trim()} variant="contained" endIcon={<SendIcon />}>Send</LoadingButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>

                      </Grow>
                    </Box>
                  </Box>
                )}
            </Paper>
          </Container>
        </Box>
      </main>
      <Footer />
    </div>
  );
}

export default Chat;