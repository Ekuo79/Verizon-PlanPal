import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Grid, Typography } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { setAssistant } from '../../context/chatSlice';
import SkeletonGroup from '../../components/SkeletonGroup/SkeletonGroup';

const NewChat = () => {
  const loading = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const characters = [
    { "firstName": "Ban", "lastName": "Zhuan" },
    { "firstName": "He", "lastName": "Cha" },
    { "firstName": "Jian", "lastName": "Shen" },
    { "firstName": "Shui", "lastName": "Jiao" }
  ];

  const renderCharacterButtons = () => {
    return (
      <Grid container spacing={2}>
        {characters.map((character) => {
          return (
            <Grid xs={3}>
              <Box margin="20px">
                <Button
                  onClick={() => handleAssistantSelect(`${character.firstName} ${character.lastName}`)}
                  variant="contained"
                  size="medium"
                  fullWidth
                  borderRadius="4px"
                  sx={{
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: 'white'
                    },
                    "border-left": "6px solid rgb(254, 190, 39)"
                  }}
                >
                  <Box
                    display='inline-flex'
                    flexDirection="column"
                    margin='10px'
                  >
                    <img
                      src={`https://verizon-chatbot-dev.s3.us-east-1.amazonaws.com/${character.firstName.toLocaleLowerCase()}_${character.lastName.toLocaleLowerCase()}.gif`}
                      alt={`Picture of ${character.firstName} ${character.lastName}`}
                      height='100px'
                    />
                    <Typography variant="subtitle1" marginTop="10px" sx={{ "color": "black" }}>
                      {character.firstName} {character.lastName}
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    );
  }

  const handleAssistantSelect = (assistant) => {
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
                <Button size="medium" sx={{ 'margin-left': '16px' }}>Button</Button>
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
                      <Button onClick={() => handleRegenerate()} variant="text" size="medium">Regenerate</Button>
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