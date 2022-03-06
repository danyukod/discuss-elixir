import {Socket} from 'phoenix';

let socket = new Socket('/socket', { params: { token: window.userToken } });

socket.connect();

const createChannelSocket = (topicId) => {
    let channel = socket.channel(`comments:${topicId}`, {});

    channel.join()
        .receive("ok", resp => {
            console.log("Joined succefully", resp)
        })
        .receive("error", resp => {
            console.log("Unable to join", resp)
        });

    document.querySelector('button').addEventListener('click', () =>{
        const content = document.querySelector('textarea').value;

        channel.push('comment:add', { content: content })
    })
};

window.createChannelSocket = createChannelSocket;