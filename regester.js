
// استيراد الربط
import { db, ref, set, push, get, child } from "./db.js";

// برمجة زرار الـ Sign Up
const signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("upName").value;
    const email = document.getElementById("upEmail").value;
    const pass = document.getElementById("upPass").value;
    const role = document.getElementById("userRole").value;

    set(push(ref(db, 'users/')), {
        username: name, email: email, password: pass, role: role
    }).then(() => {
        alert("Success!");
        signUpForm.reset();
        container.classList.remove("right-panel-active"); // يرجعه للـ Sign In بعد التسجيل
    });
});
// هنضيف "get" و "child" في سطر الـ import فوق
// import { db, ref, set, push } from "./db.js";

const signInForm = document.getElementById("signInForm");

if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("inEmail").value;
        const pass = document.getElementById("inPass").value;

        // بنقول للفايربيز: "هات لي كل المستخدمين اللي عندك"
        const dbRef = ref(db);
        get(child(dbRef, `users`)).then((snapshot) => {
            if (snapshot.exists()) {
                const users = snapshot.val();
                let userFound = false;

                // بنلف على مستخدم مستخدم نشوف مين إيميله وباسورده صح
                for (let userId in users) {
                    if (users[userId].email === email && users[userId].password === pass) {
                        userFound = true;
                        const userRole = users[userId].role;

                        alert(`أهلاً بك يا ${users[userId].username}`);
                        
                        // التوجيه حسب الرتبة
                        if (userRole === "admin") {
                            window.location.href = "admin.html"; // صفحة الأدمن
                        } else {
                            window.location.href = "shop.html";  // صفحة المتجر
                        }
                        break;
                    }
                }

                if (!userFound) {
                    alert("الإيميل أو الباسورد غلط!");
                }
            } else {
                alert("مفيش مستخدمين مسجلين أصلاً!");
            }
        }).catch((error) => {
            console.error(error);
        });
    });
}