const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
 
form.addEventListener('submit', async function (e) {
  e.preventDefault();
 
  const userMessage = input.value.trim();
  if (!userMessage) return;
 
  appendMessage('user', userMessage);
  input.value = '';
 
  // Show a temporary "Thinking..." message and get a reference to it
  const thinkingMsg = appendMessage('bot', 'Gemini is thinking...');
 
  try {
    const response = await fetch('http://localhost:3000/generate-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userMessage }),
    });
 
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

 
    const data = await response.json();
 
    if (data && data.result) {
      // Replace "Thinking..." with the actual response
      thinkingMsg.textContent = data.result;
    } else {
      thinkingMsg.textContent = 'Sorry, no response received.';
    }
  } catch (error) {
    console.error('Failed to get response:', error);
    thinkingMsg.textContent = 'Failed to get response from server.';
  }
});
 
function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg; // Return the element to allow modifying it later
}
