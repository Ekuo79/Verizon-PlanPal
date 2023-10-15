import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Grid, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { setAssistant } from '../../context/chatSlice';
import SkeletonGroup from '../../components/SkeletonGroup/SkeletonGroup';
import axios from '../../apis/backend';

const NewChat = () => {
  const loading = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const characters = [
    { "name": "Shrek" },
    { "name": "Ron Burgundy" },
    { "name": "Deadpool" },
    { "name": "Zoolander" }
  ];

  const renderCharacterButtons = () => {
    return (
      <Grid container spacing={2}>
        {characters.map((character) => {
          return (
            <Grid xs={3}>
              <Box margin="15px">
                <Button
                  onClick={() => handleAssistantSelect(`${character.name}`)}
                  variant="contained"
                  size="medium"
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)'
                    },
                    "border-bottom": "4px solid rgba(0, 0, 0, 0.3)",
                    padding: '6px',
                    borderRadius: "8px"
                  }}
                >
                  <Box
                    display='inline-flex'
                    flexDirection="column"
                  >
                    <img
                      src={`https://verizon-chatbot-dev.s3.us-east-1.amazonaws.com/${character.name.replace(/\s+/g, '').toLocaleLowerCase()}.jpg`}
                      alt={`Picture of ${character.name}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        'border-radius': '8px',
                        'pointer-events': 'none'
                      }}
                    />
                  </Box>
                </Button>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    );
  }

  const handleAssistantSelect = async (assistant) => {
    dispatch(setAssistant(assistant));
    navigate('/chat');
  };

  const handleRegenerate = () => {

  };

  return (
    <div className='GenericPage'>
      <Header />
      <main>
        <Box>
          <Container maxWidth="lg">
            <Box className="GenericPage__container_title_box GenericPage__container_title_flexBox GenericPage__container_title_flexBox_left">
              <Box className="GenericPage__container_title_flexBox GenericPage__container_title_flexBox_left">
                <Typography variant="h1">Start New Chat</Typography>
                {/* <Button size="medium" sx={{ 'margin-left': '16px' }}>Button</Button> */}
              </Box>
              <Box className="GenericPage__container_title_flexBox GenericPage__container_title_flexBox_right" sx={{ 'flex-grow': '1' }}>
                <Box className="GenericPage__container_title_flexBox_right">
                  {/* <Button variant="contained" size="medium">Button</Button> */}
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
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign='center'
                    height='75vh'
                    marginX='80px'
                  >
                    <Typography variant="h4" sx={{ "color": "black" }}>
                      Welcome to Verizon!
                    </Typography>
                    <Typography variant="h5" marginTop="10px" marginBottom="50px" sx={{ "color": "black" }}>
                      Please select your assistant
                    </Typography>
                    {renderCharacterButtons()}
                    <Box display="flex" flexDirection="row" alignItems="center" marginTop="30px" >
                      <Typography variant="h6" marginRight="15px" sx={{ "color": "black" }}>
                        Want to try someone else?
                      </Typography>
                      <Button onClick={() => handleRegenerate()} variant="text" size="medium" >Regenerate</Button>
                    </Box>
                  </Box>
                )}
            </Paper>
          </Container>
        </Box>
      </main>
      <Footer />
    </div >
  );
}

export default NewChat;