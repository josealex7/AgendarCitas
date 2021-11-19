let registrar = document.getElementById('registrar');
let usuarios = [];
if (localStorage.getItem('Usuarios')) {
    usuarios = JSON.parse(localStorage.getItem('Usuarios'));
}

const registrarUsuario = () => {
    let user = document.getElementById('NUser').value;
    let password = document.getElementById('NPassword').value;
    if (usuarios.length === 0) {
        alert('hola')
        usuarios.push({
            user,
            password
        })
        localStorage.setItem('Usuarios', JSON.stringify(usuarios));
        swal.fire({
            icon: 'success',
            title: '¡Registered user!',
            text: 'User has been successfully registered'
        }).then(() => {
            window.open('index.html');
        });

    } else {
        usuarios.forEach((users) => {
            if (users.usuario === user) {
                swal.fire('¡User already exists!', 'The user entered has already been registered', 'error')
            } else {
                usuarios.push({
                    user,
                    password
                })
                localStorage.setItem('Usuarios', JSON.stringify(usuarios));
                swal.fire('¡Registered user!', 'User has been successfully registered', 'success');
                window.open('index.html');
            }
        })
    }
}

registrar.addEventListener('click', e => {
    e.preventDefault();
    registrarUsuario();
});