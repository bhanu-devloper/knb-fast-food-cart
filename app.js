/* =====================================================
   KDB FAST FOOD
   APP.JS
===================================================== */


/* =====================================================
   SETTINGS
===================================================== */

const OWNER_WHATSAPP = "919990649590";

/*
   IMPORTANT:
   Replace this with your actual UPI ID.

   Example:

   krishna@upi

   or

   yourname@paytm
*/

const OWNER_UPI_ID = "YOUR_UPI_ID_HERE";

const RESTAURANT_NAME = "KDB FAST FOOD";



/* =====================================================
   MENU DATA
===================================================== */

const products = [

    {
        id: 1,

        name: "Steam Momo",

        price: 80,

        description:
            "Soft, hot and juicy steamed momos.",

        image:
            "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 2,

        name: "Fry Momo",

        price: 100,

        description:
            "Golden crispy fried momos with spicy dip.",

        image:
            "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 3,

        name: "Chicken Momo",

        price: 120,

        description:
            "Juicy chicken-filled momos packed with flavour.",

        image:
            "https://images.unsplash.com/photo-1738608084602-f9543952188e?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 4,

        name: "Paneer Momo",

        price: 110,

        description:
            "Delicious paneer and vegetable momos.",

        image:
            "https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 5,

        name: "Manchurian",

        price: 100,

        description:
            "Spicy, saucy and delicious Indo-Chinese Manchurian.",

        image:
            "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=900&q=85"

    },


    {
        id: 6,

        name: "French Fries",

        price: 80,

        description:
            "Hot, crispy and golden French fries.",

        image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85"

    }

];



/* =====================================================
   CART
===================================================== */

let cart = [];

let customer = {};

let selectedPayment = "";



/* =====================================================
   DOM
===================================================== */

const menuContainer =
    document.getElementById("menuContainer");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const cartDrawer =
    document.getElementById("cartDrawer");

const overlay =
    document.getElementById("overlay");

const cartEmpty =
    document.getElementById("cartEmpty");



/* =====================================================
   MONEY
===================================================== */

function money(amount) {

    return "₹" +
        amount.toLocaleString("en-IN");

}



/* =====================================================
   DISPLAY MENU
===================================================== */

function displayMenu() {

    menuContainer.innerHTML = "";


    products.forEach((product, index) => {


        const card =
            document.createElement("article");


        card.className =
            "food-card";


        card.innerHTML = `

            <div class="food-image">

                ${
                    index === 0
                    ?
                    `
                    <span class="food-badge">
                        BEST SELLER
                    </span>
                    `
                    :
                    ""
                }

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </div>


            <div class="food-details">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.description}
                </p>


                <div class="food-bottom">

                    <span class="price">
                        ${money(product.price)}
                    </span>


                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >

                        + ADD

                    </button>

                </div>

            </div>

        `;


        menuContainer.appendChild(card);

    });

}



/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}



/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    cartItems.innerHTML = "";


    let totalQuantity = 0;

    let totalPrice = 0;


    cart.forEach(item => {

        totalQuantity += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const itemElement =
            document.createElement("div");


        itemElement.className =
            "cart-item";


        itemElement.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <h4>
                    ${item.name}
                </h4>


                <div class="cart-item-price">

                    ${money(item.price)}

                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="removeFromCart(${item.id})"
            >

                ×

            </button>

        `;


        cartItems.appendChild(itemElement);

    });


    cartCount.textContent =
        totalQuantity;


    cartTotal.textContent =
        money(totalPrice);


    if (cart.length === 0) {

        cartEmpty.style.display =
            "block";

    }

    else {

        cartEmpty.style.display =
            "none";

    }

}



/* =====================================================
   CHANGE QUANTITY
===================================================== */

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    updateCart();

}



/* =====================================================
   REMOVE
===================================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    updateCart();

}



/* =====================================================
   CART OPEN / CLOSE
===================================================== */

function openCart() {

    cartDrawer.classList.add("active");

    overlay.classList.add("active");

}


function closeCart() {

    cartDrawer.classList.remove("active");

    overlay.classList.remove("active");

}



/* =====================================================
   CHECKOUT
===================================================== */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Please add some food to your cart first."
        );

        return;

    }


    closeCart();


    document
        .getElementById("checkoutModal")
        .classList.add("active");

}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}



/* =====================================================
   CUSTOMER FORM
===================================================== */

document
    .getElementById("customerForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                .getElementById("customerName")
                .value
                .trim();


            const phone =
                document
                .getElementById("customerPhone")
                .value
                .trim();


            const address =
                document
                .getElementById("customerAddress")
                .value
                .trim();


            const note =
                document
                .getElementById("customerNote")
                .value
                .trim();


            if (
                !/^[0-9]{10}$/.test(phone)
            ) {

                alert(
                    "Please enter a valid 10 digit mobile number."
                );

                return;

            }


            customer = {

                name,

                phone,

                address,

                note

            };


            closeCheckout();

            openPayment();

        }
    );



/* =====================================================
   PAYMENT
===================================================== */

function getCartTotal() {

    return cart.reduce(

        (total, item) =>

            total +
            item.price * item.quantity,

        0

    );

}


function openPayment() {

    const total =
        getCartTotal();


    document
        .getElementById("paymentTotal")
        .textContent =
        money(total);


    document
        .getElementById("upiAmount")
        .textContent =
        money(total);


    document
        .getElementById("paymentModal")
        .classList.add("active");


    document
        .getElementById("upiArea")
        .classList.remove("active");


    document
        .getElementById("codArea")
        .classList.remove("active");

}


function closePayment() {

    document
        .getElementById("paymentModal")
        .classList.remove("active");

}



/* =====================================================
   PAYMENT METHOD
===================================================== */

function selectPayment(method) {

    selectedPayment = method;


    document
        .getElementById("upiArea")
        .classList.remove("active");


    document
        .getElementById("codArea")
        .classList.remove("active");


    if (method === "upi") {

        document
            .getElementById("upiArea")
            .classList.add("active");


        generateUPIQR();

    }


    if (method === "cod") {

        document
            .getElementById("codArea")
            .classList.add("active");

    }

}



/* =====================================================
   GENERATE UPI QR
===================================================== */

function generateUPIQR() {

    const qr =
        document.getElementById("qrcode");


    qr.innerHTML = "";


    const total =
        getCartTotal();


    /*
       This creates a UPI payment link.

       You MUST replace:

       YOUR_UPI_ID_HERE

       with your real UPI ID.
    */


    const upiLink =
        `upi://pay?pa=${OWNER_UPI_ID}` +
        `&pn=${encodeURIComponent(RESTAURANT_NAME)}` +
        `&am=${total.toFixed(2)}` +
        `&cu=INR`;


    if (
        OWNER_UPI_ID ===
        "YOUR_UPI_ID_HERE"
    ) {

        qr.innerHTML = `

            <div style="
                color:#111;
                text-align:center;
                font-size:11px;
                padding:10px;
            ">

                <strong>
                    UPI ID NOT SET
                </strong>

                <br><br>

                Add your UPI ID inside
                <b>app.js</b>

            </div>

        `;

        return;

    }


    new QRCode(qr, {

        text: upiLink,

        width: 190,

        height: 190,

        colorDark: "#000000",

        colorLight: "#ffffff",

        correctLevel:
            QRCode.CorrectLevel.H

    });

}



/* =====================================================
   CREATE WHATSAPP MESSAGE
===================================================== */

function createWhatsAppMessage() {

    let message =

        `🍜 *${RESTAURANT_NAME}* 🍜\n\n`;


    message +=
        `*NEW ORDER* 📦\n\n`;


    message +=
        `👤 Name: ${customer.name}\n`;


    message +=
        `📱 Phone: ${customer.phone}\n`;


    message +=
        `📍 Address: ${customer.address}\n\n`;


    message +=
        `*ORDER DETAILS*\n`;


    message +=
        `━━━━━━━━━━━━━━\n`;


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        message +=

            `${item.name}\n` +

            `Qty: ${item.quantity} × ` +

            `${money(item.price)} = ` +

            `${money(itemTotal)}\n\n`;

    });


    message +=
        `━━━━━━━━━━━━━━\n`;


    message +=
        `💰 *TOTAL: ${money(getCartTotal())}*\n\n`;


    if (selectedPayment === "cod") {

        message +=
            `💵 Payment: *Cash on Delivery*\n`;

    }

    else {

        message +=
            `📱 Payment: *UPI*\n`;

    }


    if (customer.note) {

        message +=
            `\n📝 Note: ${customer.note}\n`;

    }


    message +=

        `\n🙏 Thank you for ordering from KDB Fast Food!`;



    return message;

}



/* =====================================================
   SEND WHATSAPP ORDER
===================================================== */

function sendWhatsAppOrder() {

    if (!customer.name) {

        alert(
            "Please enter your customer details first."
        );

        return;

    }


    const message =
        createWhatsAppMessage();


    const whatsappURL =

        `https://wa.me/${OWNER_WHATSAPP}` +

        `?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );


    /*
       Clear cart after sending.
    */

    setTimeout(
        function() {

            cart = [];

            updateCart();

            closePayment();

        },
        1000
    );

}



/* =====================================================
   WELCOME SCREEN
===================================================== */

function enterWebsite() {

    const screen =
        document.getElementById(
            "welcomeScreen"
        );


    screen.classList.add("hide");


    document.body.style.overflow =
        "auto";

}



/* =====================================================
   INITIALIZE
===================================================== */

displayMenu();

updateCart();



/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

            closeCheckout();

            closePayment();

        }

    }
);
