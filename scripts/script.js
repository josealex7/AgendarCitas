let ingresar = document.getElementById('ingresar');
let usuarios = [];
let validar = false;
if (localStorage.getItem('Usuarios')) {
    usuarios = JSON.parse(localStorage.getItem('Usuarios'));
}




const validarUsuario = () => {
    let user = document.getElementById('User').value;
    let password = document.getElementById('Password').value;
    validar = true;
    if (usuarios.length === 0) {
        swal.fire({
            title: 'Please register a user',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Register',
        }).then((result) => {
            if (result.isConfirmed) {
                window.open('register.html');
                validar = false;
            }
        })
    } else {
        usuarios.forEach((users) => {
            if (users.user === user) {
                if (users.password === password) {
                    window.open('menu.html');
                    validar = false;
                } else {
                    swal.fire('¡Wrong password!', 'The key entered does not match', 'error')

                }
            }
        })
        if (validar) {
            swal.fire('¡Wrong User!', 'The user entered does not match', 'error')
        }

    }

}

ingresar.addEventListener('click', e => {
    e.preventDefault();
    validarUsuario();
});