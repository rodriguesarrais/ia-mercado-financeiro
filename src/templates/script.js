const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const context = canvas.getContext('2d');

// Acesso à webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Erro ao acessar a webcam: ", err);
    });

snap.addEventListener('click', () => {
    // Desenha o frame atual do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Converte o canvas para data URL
    const dataURL = canvas.toDataURL('image/png');

    // Envia a imagem para o servidor
    fetch('/upload', {
        method: 'POST',
        body: JSON.stringify({ image: dataURL }),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
