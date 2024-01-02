'use strict';
const  uploadButton = document.getElementById('upload-button'),
       chosenImage = document.getElementById("chosen-image"),
       fileName = document.getElementById('file-name'),
       container = document.querySelector('.join-form__drop'),
       error = document.getElementById('error'),
        sliderItems = document.querySelectorAll('.carousel__navigation-item a'),
       imageDisplay = document.getElementById('image-display');


console.log(sliderItems)
sliderItems.forEach(item => {
    item.addEventListener('click', (e) => {
        sliderItems.forEach(item => item.classList.remove('carousel__navigation-button_active'))
        e.target.classList.add('carousel__navigation-button_active');
    })
})
const fileHandler = (file, name, type) => {
    if (type.split('/')[0] !== 'image') {
        error.innerText = 'Please upload an image file';
        return false;
    }
    error.innerText = '';
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let imageContainer = document.createElement('figure');
      let img = document.createElement('img');
      img.src = reader.result;
      imageContainer.appendChild(img);
      imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
      imageDisplay.appendChild(imageContainer);
    };
};

uploadButton.addEventListener('change', () => {
    imageDisplay.innerHTML = "";
    Array.from(uploadButton.files).forEach(file => {
       fileHandler(file, file.name, file.type);
    });
});

container.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add('join-form__drop_active')
}, false);

container.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove('join-form__drop_active')
}, false);

container.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add('join-form__drop_active');
}, false);

container.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add('join-form__drop_active');
    let draggedData = e.dataTransfer;
    let files = draggedData.files;
    imageDisplay.innerHTML = "";
    Array.from(files).forEach((file) => {
        fileHandler(file, file.name, file.type);
    })
}, false);


window.onload = () => {
    error.innerText = "";
}