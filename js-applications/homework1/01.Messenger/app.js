const getMessages = async () => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 1000);
  const signal = controller.signal;
  const response = await fetch('http://localhost:3030/jsonstore/messenger', {
    signal
  });
  clearTimeout(id);
  if (response.ok == false) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  const messages = Object.values(data).map(v => `${v.author}: ${v.content}`).join('\n');
  const messagesTextarea = document.getElementById('messages');
  messagesTextarea.value = messages;
  messagesTextarea.scrollTop = messagesTextarea.scrollHeight;
};

formId.onsubmit = async (e) => {
  e.preventDefault();

  let a = author.value;
  let c = content.value;

  if (a == '' || c == '') {
    return;
  }

  try {
    await sendMessage({ author: a, content: c });

    formId.reset();

    getMessages();
  } catch (err) {
    console.log(err);
    console.log(err.name === 'AbortError');
    console.log(err.name);
  }
};
document.getElementById('refresh').addEventListener('click', getMessages);

getMessages();

window.onkeyup = () => {
  if (author.value != '' && content.value != '') {
    submitId.disabled = false;
    error.style.display = 'none';
  } else {
    submitId.disabled = true;
    //error.style.display = 'block';
  }
};
divSubmit.onmouseover = () => {
  if (author.value != '' && content.value != '') {
    submitId.disabled = false;
    error.style.display = 'none';
  } else {
    submitId.disabled = true;
    error.style.display = 'block';
  }
};

const sendMessage = async (message) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 1000);
  const signal = controller.signal;
  const response =
    await fetch('http://localhost:3030/jsonstore/messenger', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message),
      signal
    });
  clearTimeout(id);
  if (response.ok == false) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
};