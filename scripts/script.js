let ingresar = document.getElementById('ingresar');
let usuarios = [];
if (localStorage.getItem('Usuarios')) {
    usuarios = JSON.parse(localStorage.getItem('Usuarios'));
}




const validarUsuario = () => {
    let user = document.getElementById('User').value;
    let password = document.getElementById('Password').value;

    if (usuarios.length === 0) {
        swal.fire({
            title: 'Please register a user',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Register',
        }).then((result) => {
            if (result.isConfirmed) {
                window.open('register.html');
            }
        })
    } else {
        usuarios.forEach((users) => {
            if (users.user === user) {
                if (users.password === password) {
                    return window.open('menu.html');
                } else {
                    swal.fire('¡Wrong password!', 'The key entered does not match', 'error')
                }
            }
        })
        swal.fire('¡Wrong User!', 'The user entered does not match', 'error')
    }

}

ingresar.addEventListener('click', e => {
    e.preventDefault();
    validarUsuario();
});