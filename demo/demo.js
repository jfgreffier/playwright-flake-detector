const button = document.getElementById('hello-btn');
const status = document.getElementById('status');

button.addEventListener('click', function () {
  document.writeln('success');
});

status.textContent = 'Hydrated (listener attached)';
