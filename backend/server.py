from flask import Flask, jsonify, request, session, Response
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
import os

load_dotenv()
print()

'''
from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import faiss
from langchain.embeddings.openai import OpenAIEmbeddings
import os

from langchain.chat_models import ChatOpenAI
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

from langchain.chains import RetrievalQA
from langchain.agents import Tool

from typing import Optional, Type

from langchain.callbacks.manager import (
    AsyncCallbackManagerForToolRun,
    CallbackManagerForToolRun,
)
from langchain.tools import BaseTool, StructuredTool

from langchain.chains.conversation.memory import ConversationBufferWindowMemory
from langchain.agents import initialize_agent

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.secret_key = 
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)

#Load API key from environment variable

llm=ChatOpenAI(
    openai_api_key=os.getenv('GPT_TOKEN'),
    temperature=.6,
    model_name='gpt-4',
    streaming=True, callbacks=[StreamingStdOutCallbackHandler()]
)

faiss_index = faiss.load_local("data/", OpenAIEmbeddings())

retriever = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=faiss_index.as_retriever(search_kwargs={'k': 3})
)

# Define Verizon DB tool
tool_desc = """Use this tool to answer user questions Verizon phone plans.
If the user asks any questions about different phone plans or perks, use this tool.
This tool can also be used for follow up questions from
the user.  Use this tool for most responses, except when the user asks to check out."""
verizonTool = Tool(
    func=retriever.run,
    description=tool_desc,
    name='verizonDB'
)

#Define Checkout tool
tool_desc_checkout = """Use this tool when the user indicates that they are satisfied with their chosen plan,
or when the user indicates that they are ready to check out.
You may use this tool for follow-up questions."""
class checkoutTool(BaseTool):
    name = "checkout"
    description = tool_desc_checkout

    def _run(
        self, action_input, run_manager: Optional[CallbackManagerForToolRun] = None, **kwargs
    ) -> str:
        if isinstance(action_input, str):
            action_input = {'plan': action_input}
        name = action_input.get('name', 'Unknown')
        address = action_input.get('address', 'Unknown')
        plan = action_input.get('plan', 'Unknown')
        lines = action_input.get('lines', 'Unknown')
        return f"The user is ready to checkout. Their name is {name}, address is {address}, plan is {plan}, and number of lines is {lines}."

    async def _arun(
        self, action_input, run_manager: Optional[CallbackManagerForToolRun] = None, **kwargs
    ) -> str:
        if isinstance(action_input, str):
            action_input = {'plan': action_input}
        name = action_input.get('name', 'Unknown')
        address = action_input.get('address', 'Unknown')
        plan = action_input.get('plan', 'Unknown')
        lines = action_input.get('lines', 'Unknown')
        return f"The user is ready to checkout. Their name is {name}, address is {address}, plan is {plan}, and number of lines is {lines}."

#Choose character from dropdown menu to implement !!!
character = "Deadpool"

memory = ConversationBufferWindowMemory(
    memory_key="chat_history",  # important to align with agent prompt (below)
    k=5,
    return_messages=True
)

tools = [verizonTool, checkoutTool()]

conversational_agent = initialize_agent(
    agent='chat-conversational-react-description',
    tools=tools,
    llm=llm,
    verbose=False,
    max_iterations=2,
    early_stopping_method="generate",
    memory=memory,
    handle_parsing_errors=True
)
memory.save_context({"input": "Do you get it?"},
 {"output": """Yeah I get it. I'm {character}. Yes, I can help answer questions about Verizon phone plans.
I will respond with the personality you specify, in JSON format.
No repeating info or mentioning tools I use.
I'll be quick and to the point, while being clever and out of the box."""})

if character == "Deadpool":
    catch_phrases = [
    "Maximum effort!",
    "Chimichangas!",
    "I'm touching myself tonight.",
    "With great power comes great irresponsibility.",
    "Did I leave the stove on?",
    "Time to make the chimi-freakin'-changas!",
    "I'm the merc with a mouth.",
    "I know, right?",
    "You can't buy love, but you can rent it for three minutes!",
    "Fourth wall break inside a fourth wall break? That's like... sixteen walls.",
    "Hi, I'm Wade Wilson, and I'm here to talk to you about testicular cancer.",
    "Smells like old lady pants in here.",
    "Say the magic words, fat Gandalf.",
    "Superhero landing!",
    "So dark! Are you sure you're not from the DC Universe?"
]

elif character == "Shrek":
    catch_phrases = [
    "Ogres are like onions.",
    "Better out than in, I always say.",
    "I'm not a puppet. I'm a real boy!",
    "What are you doing in my swamp?",
    "This is the part where you run away.",
    "Do you know what that thing could do? It'll grind your bones for its bread.",
    "I got this.",
    "I like that boulder. That is a nice boulder.",
    "You're going the right way for a smacked bottom.",
    "I'm making waffles!"
]
elif character == "Ron Burgundy":
    catch_phrases = [
    "Stay classy, San Diego.",
    "I'm kind of a big deal.",
    "I'm Ron Burgundy?",
    "You stay classy.",
    "I love scotch. Scotchy, scotch, scotch.",
    "Don't act like you're not impressed.",
    "It's so damn hot. Milk was a bad choice.",
    "I immediately regret this decision.",
    "60% of the time, it works every time.",
    "Well, that escalated quickly.",
    "I'm in a glass case of emotion!",
    "What is this? A center for ants?",
    "I'm not a baby, I am a man! I am an anchorman!",
    "I look good. I mean, really good. Hey everyone! Come and see how good I look!",
    "You're so wise. You're like a miniature Buddha, covered in hair."
]
elif character == "Zoolander":
    catch_phrases = [
        "What is this? A center for ants?",
        "I'm pretty sure there's a lot more to life than being really, really, ridiculously good looking.",
        "I feel like I'm taking crazy pills!",
        "Blue Steel!",
        "Magnum!",
        "Moisture is the essence of wetness, and wetness is the essence of beauty.",
        "So hot right now!",
        "He's absolutely right.",
        "I'm not an ambi-turner.",
        "It's a walk-off!",
        "Obey my dog!",
        "I invented the piano key necktie!",
        "Who you tryin' to get crazy with, ese? Don't you know I'm loco?",
        "Listen to your friend Billy Zane. He's a cool dude."
    ]
else:
    raise
    catch_phrases = ["No catch phrases available for this character."]

sys_msg = f"""You are a helpful chatbot that answers the user's questions about Verizon phone plans.
You will respond with the personality of {character}.
Remember to always return your result in the JSON format, or else I won't be able to understand you!.
Do not repeat information.
Do not use the name of your tools, I dont want to hear them.
Make your reponses as short as possible, being effective at getting to the point while providing the necessary info.
Use catch phrases: {', '.join(catch_phrases)} but don't overuse them, be creative and clever!
"""


prompt = conversational_agent.agent.create_prompt(
    system_message=sys_msg,
    tools=tools
)
conversational_agent.agent.llm_chain.prompt = prompt

'''
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.secret_key = os.getenv('SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'

Session(app)

@app.route('/api/assistant', methods=['POST'])
def get_assistant():
    assistant = request.json.get('assistant')
    return {'response': assistant}, 200
    if 'agent' not in session:

    #if assistant == "Deadpool":
        catch_phrases = [
        "Maximum effort!",
        "Chimichangas!",
        "I'm touching myself tonight.",
        "With great power comes great irresponsibility.",
        "Did I leave the stove on?",
        "Time to make the chimi-freakin'-changas!",
        "I'm the merc with a mouth.",
        "I know, right?",
        "You can't buy love, but you can rent it for three minutes!",
        "Fourth wall break inside a fourth wall break? That's like... sixteen walls.",
        "Hi, I'm Wade Wilson, and I'm here to talk to you about testicular cancer.",
        "Smells like old lady pants in here.",
        "Say the magic words, fat Gandalf.",
        "Superhero landing!",
        "So dark! Are you sure you're not from the DC Universe?"
    ]

    elif assistant == "Shrek":
        catch_phrases = [
        "Ogres are like onions.",
        "Better out than in, I always say.",
        "I'm not a puppet. I'm a real boy!",
        "What are you doing in my swamp?",
        "This is the part where you run away.",
        "Do you know what that thing could do? It'll grind your bones for its bread.",
        "I got this.",
        "I like that boulder. That is a nice boulder.",
        "You're going the right way for a smacked bottom.",
        "I'm making waffles!"
    ]
    elif assistant == "Ron Burgundy":
        catch_phrases = [
        "Stay classy, San Diego.",
        "I'm kind of a big deal.",
        "I'm Ron Burgundy?",
        "You stay classy.",
        "I love scotch. Scotchy, scotch, scotch.",
        "Don't act like you're not impressed.",
        "It's so damn hot. Milk was a bad choice.",
        "I immediately regret this decision.",
        "60% of the time, it works every time.",
        "Well, that escalated quickly.",
        "I'm in a glass case of emotion!",
        "What is this? A center for ants?",
        "I'm not a baby, I am a man! I am an anchorman!",
        "I look good. I mean, really good. Hey everyone! Come and see how good I look!",
        "You're so wise. You're like a miniature Buddha, covered in hair."
    ]
    elif assistant == "Zoolander":
        catch_phrases = [
            "What is this? A center for ants?",
            "I'm pretty sure there's a lot more to life than being really, really, ridiculously good looking.",
            "I feel like I'm taking crazy pills!",
            "Blue Steel!",
            "Magnum!",
            "Moisture is the essence of wetness, and wetness is the essence of beauty.",
            "So hot right now!",
            "He's absolutely right.",
            "I'm not an ambi-turner.",
            "It's a walk-off!",
            "Obey my dog!",
            "I invented the piano key necktie!",
            "Who you tryin' to get crazy with, ese? Don't you know I'm loco?",
            "Listen to your friend Billy Zane. He's a cool dude."
        ]
    else:
        raise
        catch_phrases = ["No catch phrases available for this character."]


import time
@app.route('/api/stream')
def generate_stream():
    data = '5G, or "Fifth Generation," represents the latest advancement in wireless communication technology. It is the successor to 4G (LTE) and is designed to provide significantly faster data speeds, lower latency, increased network capacity, and improved reliability compared to previous generations of wireless networks.'
    def generate():
        for char in data:
            yield char
            time.sleep(0.5)
    return Response(generate(), {"Content-Type": "text/plain"})
    
# Chatbox API CALL
@app.route('/api/chat', methods=['POST'])
def chatbox():
    #get query string
    prompt = request.json.get('prompt')

    if prompt is None or not isinstance(prompt, str):
        return jsonify(error="Missing or invalid prompt"), 400
    print(prompt)

    if 'agent' not in session:
        #initialize agent here
        #session['agent'] = initialize_agent()
        session['agent'] = "agent" #place holder

        #agent will make first response
        
    else:
        agent = session['agent']
        agent(prompt)

    return jsonify(prompt=prompt), 200



if __name__ == "__main__":
    app.run(debug=True)