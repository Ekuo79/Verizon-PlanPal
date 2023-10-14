import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SkeletonGroup from '../../components/SkeletonGroup/SkeletonGroup';
import axios from '../../apis/backend';

const Chat = () => {
  const loading = false;
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const assistant = useSelector((state) => state.chat.assistant);

  const handleSendMessage = async () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, message]);
      setMessage('');
      try {
        const response = await axios.post('/chat', {
          prompt: message.trim()
        });
      } catch (error) {
      }
    }
  };

  const handleSwitchAssistant = () => {
    navigate('/new');
  };

  useEffect(() => {
    if (!assistant) navigate('/new');
  }, []);

  return (
    <div className='GenericPage'>
      <Header />
      <main>
        <Box>
          <Container maxWidth="lg">
            <Box className="GenericPage__container_title_box GenericPage__container_title_flexBox GenericPage__container_title_flexBox_left">
              <Box className="GenericPage__container_title_flexBox GenericPage__container_title_flexBox_left">
                <Typography variant="h1">{`Chat with ${assistant}`}</Typography>
                <Button onClick={() => handleSwitchAssistant()} size="medium" sx={{ 'margin-left': '16px' }}>Switch</Button>
              </Box>
              <Box className="GenericPage__container_title_flexBox GenericPage__container_title_flexBox_right" sx={{ 'flex-grow': '1' }}>
                <Box className="GenericPage__container_title_flexBox_right">
                  <Button variant="contained" size="medium">Button</Button>
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
                      maxWidth: '600px',
                      margin: '0 auto',
                      p: 2
                    }}
                  >
                    {/* Chat History */}
                    <Box
                      component={Paper}
                      sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        p: 2,
                        mb: 2
                      }}
                    >
                      {chatHistory.map((msg, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          {msg}
                        </Box>
                      ))}
                    </Box>

                    {/* Input Area */}
                    <Box
                      component={Paper}
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            handleSendMessage();
                            e.preventDefault();  // prevent the default action (new line) from being performed
                          }
                        }}
                      />
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