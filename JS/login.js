
document.addEventListener('DOMContentLoaded', function() {
 
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log('User is already logged in:', user.email);
     
            if (localStorage.getItem('rememberMe') === 'true') {
            
            }
        }
    });


    document.getElementById('login-btn').addEventListener('click', function() {
        loginUser();
    });

    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginUser();
        }
    });


    document.getElementById('forgot-pass').addEventListener('click', function(e) {
        e.preventDefault();
        resetPassword();
    });
});


function loginUser() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const keepLogged = document.getElementById('keep-logged').checked;
    
 
    if (!email || !password) {
        showMessage('error-message', 'Please fill in all fields');
        return;
    }

    if (!isValidGmail(email)) {
        showMessage('error-message', 'Only Gmail addresses are allowed (example@gmail.com)');
        return;
    }
    
 
    showLoading(true);
    hideMessage('error-message');
    hideMessage('success-message');
    
 
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
           
            const user = userCredential.user;
            
            const userRef = database.ref('users/' + user.uid);
            
            userRef.update({
                lastLogin: new Date().toISOString(),
                status: 'online'
            });
          
            if (keepLogged) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', email);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('userEmail');
            }
            
    
            showMessage('success-message', 'Login successful! Redirecting...', 'success');
            
       
            setTimeout(() => {
                window.location.href = 'home.html'
            }, 2000);
        })
        .catch((error) => {
           
            showLoading(false);
        
            let errorMessage = 'Login failed. ';
            switch(error.code) {
                case 'auth/invalid-email':
                    errorMessage += 'Invalid email address.';
                    break;
                case 'auth/user-disabled':
                    errorMessage += 'This account has been disabled.';
                    break;
                case 'auth/user-not-found':
                    errorMessage += 'No account found with this email.';
                    break;
                case 'auth/wrong-password':
                    errorMessage += 'Incorrect password.';
                    break;
                default:
                    errorMessage += error.message;
            }
            showMessage('error-message', errorMessage);
        });
}


function resetPassword() {
    const email = prompt('Please enter your Gmail address to reset password:');
    
    if (email) {
        if (!isValidGmail(email)) {
            alert('Only Gmail addresses are allowed (example@gmail.com)');
            return;
        }
        
        showLoading(true);
        
        auth.sendPasswordResetEmail(email)
            .then(() => {
                showLoading(false);
                alert('Password reset email sent! Please check your Gmail inbox.');
            })
            .catch((error) => {
                showLoading(false);
                alert('Error: ' + error.message);
            });
    }
}


function autoFillFromLocalStorage() {
    const rememberedEmail = localStorage.getItem('userEmail');
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('keep-logged').checked = true;
    }
}

window.onload = autoFillFromLocalStorage;