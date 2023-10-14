from flask import Flask, request, session
from flask_session import Session

app = Flask(__name__)

app.secret_key = '8e12473ac37508b188ea163b0ebd7e845f541134dd515846ce15fde15cdc08bab18515afcd292a5500c923f1e50086ef36dc3b282499e8ccc059546fcb3e6f7d'
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)

# Chatbox API CALL
@app.route('/api/chat', methods=['POST'])
def home():
    #get query string
    userInput = request.args.get('userInput')
    print(userInput)

    if 'pastChat' not in session:
        session['pastChat'] = ["Here is the past chats for context: "]
    session['pastChat'].append(userInput)

    input = ". ".join(session['pastChat'])

    #call openAI with input

    #append openAi response to session['pastChat']
    session['pastChat'].append("openAI response")
    

    return {"response": "openAI response"}


if __name__ == "__main__":
    app.run(debug=True)