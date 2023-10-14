from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.secret_key = '8e12473ac37508b188ea163b0ebd7e845f541134dd515846ce15fde15cdc08bab18515afcd292a5500c923f1e50086ef36dc3b282499e8ccc059546fcb3e6f7d'
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)

# Chatbox API CALL
@app.route('/api/chat', methods=['POST'])
def home():
    #get query string
    prompt = request.json.get('prompt')
    if prompt is None or not isinstance(prompt, str):
        return jsonify(error="Missing or invalid prompt"), 400
    print(prompt)

    pastChat = session.get('pastChat')
    if pastChat is None:
        session['pastChat'] = []
        input = prompt
    else:
        input = prompt + ". Here is the past chats for context: ".join(pastChat)
    session['pastChat'].append(prompt)

    #call openAI with input

    #append openAi response to session['pastChat']
    session['pastChat'].append("openAI response")
    
    return {"response": "openAI response"}, 200


if __name__ == "__main__":
    app.run(debug=True)