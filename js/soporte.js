document.addEventListener('DOMContentLoaded', () => {
    const btnSoporte = document.getElementById('btn-soporte');
    const cuadroSoporte = document.getElementById('soporte-cuadro');

    btnSoporte.addEventListener('click', () => {
        const visible = cuadroSoporte.style.display === 'block';
        cuadroSoporte.style.display = visible ? 'none' : 'block';
    });

    document.addEventListener('click', (event) => {
        if (!btnSoporte.contains(event.target) && !cuadroSoporte.contains(event.target)) {
            cuadroSoporte.style.display = 'none';
        }
    });
});
