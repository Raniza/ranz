import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Navbar, Container, Nav, Stack, Badge, Form, Button, Row, Col, Card, OverlayTrigger, Tooltip, Modal, Spinner, InputGroup, Accordion, ListGroup, Table, Placeholder } from "react-bootstrap";
import { usePage, Link, useForm, router, createInertiaApp } from "@inertiajs/react";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faBars, faArrowRightFromBracket, faArrowRightToBracket, faArrowUpFromBracket, faHouse, faPlus, faFloppyDisk as faFloppyDisk$1 } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays, faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faBootstrap } from "@fortawesome/free-brands-svg-icons";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
const Ranz = "/build/assets/ranz2--q8olPTO.png";
function Menu() {
  const { auth } = usePage().props;
  const { component, url } = usePage();
  return /* @__PURE__ */ jsx(
    Navbar,
    {
      expand: "lg",
      className: "bg-body-tertiary border-bottom mb-2",
      sticky: "top",
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs(Navbar.Brand, { href: "#home", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: Ranz,
              width: "28",
              height: "28",
              className: "d-inline-block align-top",
              alt: "Ranzcoding"
            }
          ),
          " ",
          /* @__PURE__ */ jsx("span", { className: "fw-bolder", style: { color: "#512DA8" }, children: "RANZ" })
        ] }),
        /* @__PURE__ */ jsx(Navbar.Toggle, { "aria-controls": "basic-navbar-nav" }),
        /* @__PURE__ */ jsxs(Navbar.Collapse, { id: "basic-navbar-nav", children: [
          /* @__PURE__ */ jsxs(Nav, { className: "m-auto", children: [
            /* @__PURE__ */ jsx(
              Nav.Link,
              {
                as: Link,
                href: "/",
                className: component === "Home" ? "active" : "",
                children: "Home"
              }
            ),
            /* @__PURE__ */ jsx(
              Nav.Link,
              {
                as: Link,
                href: "/tutorials/all",
                className: url.startsWith("/tutorials") ? "active" : "",
                children: "Tutorials"
              }
            ),
            /* @__PURE__ */ jsx(Nav.Link, { as: Link, href: "#", disabled: true, children: "Demo" }),
            /* @__PURE__ */ jsx(
              Nav.Link,
              {
                as: Link,
                href: "/about",
                className: url === "/about" ? "active" : "",
                children: "About"
              }
            ),
            auth.user && auth.user.role === "admin" && /* @__PURE__ */ jsx(
              Nav.Link,
              {
                as: Link,
                href: "/admin",
                className: url === "/admin" ? "active" : "",
                style: { textDecoration: "underline" },
                children: "Admin Panel"
              }
            ),
            /* @__PURE__ */ jsx(
              Nav.Link,
              {
                as: Link,
                href: auth.user ? "/logout" : "/login",
                children: /* @__PURE__ */ jsx(
                  Stack,
                  {
                    direction: "horizontal",
                    style: { cursor: "pointer" },
                    children: /* @__PURE__ */ jsx(
                      Badge,
                      {
                        pill: true,
                        bg: auth.user ? "secondary" : "danger",
                        className: "py-2 px-3",
                        children: auth.user ? "Logout" : "Login"
                      }
                    )
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Form, { className: "d-flex", children: [
            /* @__PURE__ */ jsx(
              Form.Control,
              {
                type: "search",
                placeholder: "Search",
                className: "me-2 form-control-sm",
                "aria-label": "Search"
              }
            ),
            /* @__PURE__ */ jsx(Button, { variant: "outline-success", className: "btn-sm", children: "Search" })
          ] })
        ] })
      ] })
    }
  );
}
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Menu
}, Symbol.toStringTag, { value: "Module" }));
function Footer({ user }) {
  const [isFixedBottom, setIsFixedBottom] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      const contentHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      setIsFixedBottom(contentHeight <= viewportHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    Navbar,
    {
      className: "bg-body-tertiary border-top",
      fixed: isFixedBottom ? "bottom" : void 0,
      children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs(Navbar.Collapse, { className: "justify-content-center", children: [
          /* @__PURE__ */ jsxs(Navbar.Brand, { href: "#home", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: Ranz,
                width: "28",
                height: "28",
                className: "d-inline-block align-top",
                alt: "Ranzcoding"
              }
            ),
            " ",
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "fw-bolder",
                style: { color: "#512DA8" },
                children: "RANZ"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(Navbar.Text, { children: [
            "Signed in as: ",
            user
          ] })
        ] }),
        /* @__PURE__ */ jsx(Navbar.Toggle, {})
      ] })
    }
  );
}
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Footer
}, Symbol.toStringTag, { value: "Module" }));
function Layout({ children }) {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Menu, {}),
    /* @__PURE__ */ jsx(Container, { className: "mb-3", children }),
    /* @__PURE__ */ jsx(Footer, { user: auth.user ? auth.user.name : "Guest" })
  ] });
}
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout
}, Symbol.toStringTag, { value: "Module" }));
function About() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx("h4", { children: "About" }) }) });
}
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
function SideMenu({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "container-fluid", children: /* @__PURE__ */ jsxs("div", { className: "row flex-nowrap", children: [
    /* @__PURE__ */ jsx("div", { className: "col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark", children: /* @__PURE__ */ jsxs("div", { className: "d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/",
          className: "d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none",
          children: /* @__PURE__ */ jsx("span", { className: "fs-5 d-none d-sm-inline", children: "Admin Panel" })
        }
      ),
      /* @__PURE__ */ jsxs(
        "ul",
        {
          className: "nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start",
          id: "menu",
          children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: "#",
                className: "nav-link ranz-nav px-0 align-middle",
                children: [
                  /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faCalendarDays }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "ms-1 d-none d-sm-inline", children: "Orders" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: "#submenu2",
                  "data-bs-toggle": "collapse",
                  className: "nav-link ranz-nav px-0 align-middle",
                  children: [
                    /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faBootstrap }),
                    " ",
                    /* @__PURE__ */ jsx("span", { className: "ms-1 d-none d-sm-inline", children: "Bootstrap" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "ul",
                {
                  className: "collapse nav flex-column ms-1",
                  id: "submenu2",
                  "data-bs-parent": "#menu",
                  children: [
                    /* @__PURE__ */ jsx("li", { className: "w-100", children: /* @__PURE__ */ jsxs(
                      Link,
                      {
                        href: "#",
                        className: "nav-link ranz-nav px-0",
                        children: [
                          " ",
                          /* @__PURE__ */ jsx("span", { className: "d-none d-sm-inline", children: "Item" }),
                          " ",
                          "1"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                      Link,
                      {
                        href: "#",
                        className: "nav-link ranz-nav px-0",
                        children: [
                          " ",
                          /* @__PURE__ */ jsx("span", { className: "d-none d-sm-inline", children: "Item" }),
                          " ",
                          "2"
                        ]
                      }
                    ) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              Link,
              {
                href: "#",
                className: "nav-link ranz-nav px-0 align-middle",
                children: [
                  /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faUsers }),
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "ms-1 d-none d-sm-inline", children: "Customers" }),
                  " "
                ]
              }
            ) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "col px-0", children: [
      /* @__PURE__ */ jsx(
        Navbar,
        {
          expand: "lg",
          className: "bg-body-tertinary border-bottom border-bod py-0",
          children: /* @__PURE__ */ jsxs(Container, { children: [
            /* @__PURE__ */ jsx(Navbar.Collapse, { id: "basic-navbar-nav", children: /* @__PURE__ */ jsxs(Nav, { className: "me-auto", children: [
              /* @__PURE__ */ jsx(Nav.Link, { as: Link, href: "#", children: /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faBars }) }),
              /* @__PURE__ */ jsx(Nav.Link, { as: Link, href: "/", children: "Home" })
            ] }) }),
            /* @__PURE__ */ jsx(Navbar.Collapse, { className: "justify-content-end me-2", children: /* @__PURE__ */ jsxs(Nav.Link, { as: Link, href: "/logout", children: [
              /* @__PURE__ */ jsx(
                FontAwesomeIcon,
                {
                  icon: faArrowRightFromBracket
                }
              ),
              " ",
              "Logout"
            ] }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "col py-3 px-3", children })
    ] })
  ] }) });
}
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SideMenu
}, Symbol.toStringTag, { value: "Module" }));
function Admin() {
  return /* @__PURE__ */ jsx(SideMenu, { children: /* @__PURE__ */ jsx("h5", { children: "Admin" }) });
}
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Admin
}, Symbol.toStringTag, { value: "Module" }));
function AuthLayout({ children, title, info, handleSubmit }) {
  return /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { xs: "11", lg: "4", className: "m-auto py-5", children: /* @__PURE__ */ jsx(Card, { className: "ranz-border", children: /* @__PURE__ */ jsxs(Card.Body, { children: [
    /* @__PURE__ */ jsxs(Stack, { gap: "2", className: "col-m mx-auto mb-1", children: [
      /* @__PURE__ */ jsxs("h4", { className: "text-center", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: Ranz,
            alt: "ranz",
            width: "26",
            height: "26",
            className: "align-middle"
          }
        ),
        " ",
        /* @__PURE__ */ jsx("span", { className: "align-middle", children: title })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center", children: info })
    ] }),
    /* @__PURE__ */ jsx("hr", { className: "mt-0" }),
    /* @__PURE__ */ jsx(Form, { onSubmit: handleSubmit, children })
  ] }) }) }) });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AuthLayout
}, Symbol.toStringTag, { value: "Module" }));
function OverlayTooltip({ id, children, title }) {
  return /* @__PURE__ */ jsx(OverlayTrigger, { overlay: /* @__PURE__ */ jsx(Tooltip, { id, children: title }), children });
}
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: OverlayTooltip
}, Symbol.toStringTag, { value: "Module" }));
function FlashMessage({
  flashShow,
  handleClose,
  message,
  success
}) {
  return /* @__PURE__ */ jsx(Modal, { show: flashShow, onHide: handleClose, children: /* @__PURE__ */ jsx(
    Card,
    {
      className: "border-0",
      bg: success ? "success" : "danger",
      text: "white",
      children: /* @__PURE__ */ jsxs(Modal.Body, { children: [
        message,
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("div", { className: "d-flex justify-content-end", children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "secondary",
            onClick: handleClose,
            size: "sm",
            children: "Close"
          }
        ) })
      ] })
    }
  ) });
}
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: FlashMessage
}, Symbol.toStringTag, { value: "Module" }));
function Login() {
  const { flash } = usePage().props;
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    email: "",
    password: ""
  });
  const [flashShow, setFlashShow] = useState(true);
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setData({ ...data, [key]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post("/auth", {
      onError: () => setFlashShow(true),
      onSuccess: () => {
        clearErrors();
        console.log(flash.message);
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    errors && errors.notmatch && /* @__PURE__ */ jsx(
      FlashMessage,
      {
        flashShow,
        message: errors.notmatch,
        handleClose: () => setFlashShow(false),
        success: false
      }
    ),
    /* @__PURE__ */ jsxs(
      AuthLayout,
      {
        title: "LOGIN",
        info: "Silahkan login untuk memulai sesi anda.",
        handleSubmit,
        children: [
          /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", controlId: "formBasicEmail", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Email address" }),
            /* @__PURE__ */ jsx(
              Form.Control,
              {
                type: "email",
                placeholder: "Enter email",
                name: "email",
                onChange: handleChange,
                disabled: processing,
                autoFocus: true
              }
            ),
            errors && errors.email && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-danger",
                  style: { fontSize: "14px" },
                  children: errors.email
                }
              ),
              /* @__PURE__ */ jsx("br", {})
            ] }),
            /* @__PURE__ */ jsx(Form.Text, { className: "text-muted", children: "Kami tidak akan pernah memberikan email anda kepada siapapun." })
          ] }),
          /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", controlId: "formBasicPassword", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Password" }),
            /* @__PURE__ */ jsx(
              Form.Control,
              {
                type: "password",
                placeholder: "Password",
                name: "password",
                onChange: handleChange,
                disabled: processing
              }
            ),
            errors && errors.password && /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-danger mb-2",
                style: { fontSize: "16px" },
                children: errors.password
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "d-grid gap-2", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "primary",
                type: "submit",
                size: "sm",
                disabled: processing,
                children: [
                  /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faArrowRightToBracket }),
                  " Sign In"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline-success",
                size: "sm",
                className: "col-12",
                onClick: () => router.get("/register"),
                disabled: processing,
                children: [
                  /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faArrowUpFromBracket }),
                  " SIgn Up"
                ]
              }
            )
          ] }),
          !processing && /* @__PURE__ */ jsx(
            OverlayTooltip,
            {
              id: "loginTooltip",
              title: "Kembali ke halaman utama",
              children: /* @__PURE__ */ jsxs(Link, { href: "/", children: [
                /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faHouse }),
                " Home"
              ] })
            }
          )
        ]
      }
    )
  ] });
}
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
function Register() {
  const { data, setData, post, processing, errors, clearErrors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setData({ ...data, [key]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();
    post("/register-user", { preserveScroll: true });
  };
  const submitButton = () => {
    if (processing) {
      return /* @__PURE__ */ jsxs(Button, { variant: "primary", type: "button", size: "sm", disabled: true, children: [
        /* @__PURE__ */ jsx(
          Spinner,
          {
            as: "span",
            animation: "border",
            size: "sm",
            role: "status",
            "aria-hidden": "true"
          }
        ),
        " ",
        "Loading..."
      ] });
    } else {
      return /* @__PURE__ */ jsx(Button, { variant: "primary", type: "submit", size: "sm", children: "Submit" });
    }
  };
  return /* @__PURE__ */ jsxs(
    AuthLayout,
    {
      title: "REGISTER",
      info: "Register RANZ Coding",
      handleSubmit,
      children: [
        /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", controlId: "formBasicText", children: [
          /* @__PURE__ */ jsx(Form.Label, { children: "User Name" }),
          /* @__PURE__ */ jsx(
            Form.Control,
            {
              className: errors && errors.name ? "is-invalid" : "",
              type: "text",
              placeholder: "Masukan nama anda",
              onChange: handleChange,
              name: "name",
              disabled: processing,
              autoFocus: true
            }
          ),
          errors && errors.name && /* @__PURE__ */ jsx("span", { className: "text-danger", style: { fontSize: "14px" }, children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", controlId: "formBasicEmail", children: [
          /* @__PURE__ */ jsx(Form.Label, { children: "Email" }),
          /* @__PURE__ */ jsx(
            Form.Control,
            {
              className: errors && errors.email ? "is-invalid" : "",
              type: "email",
              placeholder: "Enter email",
              onChange: handleChange,
              disabled: processing,
              name: "email"
            }
          ),
          errors && errors.email && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "text-danger",
                style: { fontSize: "14px" },
                children: errors.email
              }
            ),
            /* @__PURE__ */ jsx("br", {})
          ] }),
          /* @__PURE__ */ jsx(Form.Text, { className: "text-muted", children: "Kami tidak akan pernah memberikan email anda kepada siapapun." })
        ] }),
        /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", controlId: "formBasicPassword", children: [
          /* @__PURE__ */ jsx(Form.Label, { children: "Password" }),
          /* @__PURE__ */ jsx(
            Form.Control,
            {
              className: errors && errors.password ? "is-invalid" : "",
              type: "password",
              placeholder: "Masukan password anda",
              onChange: handleChange,
              disabled: processing,
              name: "password"
            }
          ),
          errors && errors.password && /* @__PURE__ */ jsx("span", { className: "text-danger", style: { fontSize: "14px" }, children: errors.password })
        ] }),
        /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", controlId: "formBasicConfirmPassword", children: [
          /* @__PURE__ */ jsx(Form.Label, { children: "Confirm Password" }),
          /* @__PURE__ */ jsx(
            Form.Control,
            {
              className: errors && errors.password_confirmation ? "is-invalid" : "",
              type: "password",
              placeholder: "Masukan password anda kembali",
              onChange: handleChange,
              disabled: processing,
              name: "password_confirmation"
            }
          ),
          errors && errors.password_confirmation && /* @__PURE__ */ jsx("span", { className: "text-danger", style: { fontSize: "14px" }, children: errors.password_confirmation })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "d-grid gap-2", children: submitButton() }),
        !processing && /* @__PURE__ */ jsxs(Stack, { direction: "horizontal", gap: 3, children: [
          /* @__PURE__ */ jsx(OverlayTooltip, { id: "registerTooltip", title: "Login page", children: /* @__PURE__ */ jsxs(Link, { href: "/login", children: [
            /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faArrowRightToBracket }),
            " ",
            "Login"
          ] }) }),
          /* @__PURE__ */ jsx(
            OverlayTooltip,
            {
              id: "loginTooltip",
              title: "Kembali ke halaman utama",
              children: /* @__PURE__ */ jsxs(Link, { className: "ms-auto", href: "/", children: [
                /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faHouse }),
                " Home"
              ] })
            }
          )
        ] })
      ]
    }
  );
}
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
function VerifyEmail() {
  const handleSubmitVerifyEMail = () => {
    router.post("/email/resend");
  };
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Card, { className: "col-10 m-auto mt-5", children: /* @__PURE__ */ jsxs(Card.Body, { children: [
    /* @__PURE__ */ jsx(Card.Title, { children: "Verifikasi email anda" }),
    /* @__PURE__ */ jsx(Card.Text, { children: "Sebelum melanjutkan proses ini, silahkan check email anda untuk verifikasi link. Jika anda tidak mendapatkan email," }),
    /* @__PURE__ */ jsx(Form, { onSubmit: handleSubmitVerifyEMail, children: /* @__PURE__ */ jsx(Button, { size: "sm", variant: "primary", type: "submit", children: "Click untuk mengirimkan kembali link verifikasi email" }) })
  ] }) }) });
}
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: VerifyEmail
}, Symbol.toStringTag, { value: "Module" }));
function Editor({ editorRef }) {
  return /* @__PURE__ */ jsx("div", { ref: editorRef });
}
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Editor
}, Symbol.toStringTag, { value: "Module" }));
const laravel = "/build/assets/laravel-DIbhNRiv.png";
const javascripts = "/build/assets/javascripts-CnZZi2Bi.png";
const react = "/build/assets/react-B4d9_H0H.png";
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const logo = {
  laravel,
  javascripts,
  react
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize,
  logo
}, Symbol.toStringTag, { value: "Module" }));
function Home() {
  const { flash, auth } = usePage().props;
  const [flashShow, setFlashShow] = useState(false);
  useEffect(() => {
    if (flash && flash.message) {
      setFlashShow(true);
    }
  }, []);
  return /* @__PURE__ */ jsxs(Layout, { children: [
    flash && flash.message && /* @__PURE__ */ jsx(
      FlashMessage,
      {
        flashShow,
        message: flash.message,
        handleClose: () => setFlashShow(false),
        success: flash.success
      }
    ),
    auth.user && auth.user.role === "admin" && /* @__PURE__ */ jsx(
      Button,
      {
        variant: "primary",
        size: "sm",
        className: "mb-2 mt-2",
        onClick: () => router.get("/home/edit"),
        children: "Edit Home"
      }
    ),
    /* @__PURE__ */ jsx("h4", { children: "Home" })
  ] });
}
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
function HomeEdit({ home }) {
  const editorRef = useRef();
  const saveHome = () => {
    const data = {
      contents: $(editorRef.current).summernote("code")
    };
    router.post("/home/save", data, {
      onError: (errors) => alert(errors.contents)
    });
  };
  useEffect(() => {
    if (home) {
      $(editorRef.current).summernote("code", home.contents);
    } else {
      $(editorRef.current).summernote({
        placeholder: "Tulis home web disini.",
        callbacks: {
          onInit: function() {
            $(editorRef.current).summernote("code", "");
          }
        }
      });
    }
    console.log(home);
  }, []);
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between mb-2", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-primary", children: "Edit Home" }),
      /* @__PURE__ */ jsxs(Button, { variant: "success", size: "sm", onClick: saveHome, children: [
        /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faFloppyDisk }),
        " Save Home"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Row, { style: { backgroundColor: "white" }, className: "d-flex", children: /* @__PURE__ */ jsx(Col, { className: "mb-3", children: /* @__PURE__ */ jsx("textarea", { name: "tutorial", ref: editorRef }) }) })
  ] });
}
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomeEdit
}, Symbol.toStringTag, { value: "Module" }));
function AddTitleModal({ show, handleClose, categories }) {
  const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
    title: "",
    prologue: "",
    category_id: ""
  });
  const prologueRef = useRef();
  const handleTitleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setData({ ...data, [key]: value });
  };
  const handleSaveTitle = (e) => {
    e.preventDefault();
    post("/tutorials/title", {
      onSuccess: () => handleHide()
    });
  };
  const handleHide = () => {
    reset();
    clearErrors();
    handleClose();
  };
  return /* @__PURE__ */ jsxs(Modal, { show, onHide: handleHide, children: [
    /* @__PURE__ */ jsx(Modal.Header, { className: "py-1", children: /* @__PURE__ */ jsx(Modal.Title, { className: "fs-5", children: "Add Title" }) }),
    /* @__PURE__ */ jsxs(Form, { onSubmit: handleSaveTitle, children: [
      /* @__PURE__ */ jsxs(Modal.Body, { children: [
        /* @__PURE__ */ jsxs(Form.Group, { className: "mb-3", controlId: "title", children: [
          /* @__PURE__ */ jsx(Form.Label, { children: "Title" }),
          /* @__PURE__ */ jsx(
            Form.Control,
            {
              className: errors && errors.title ? "is-invalid" : "",
              type: "text",
              placeholder: "Typed title here...",
              autoFocus: true,
              size: "sm",
              name: "title",
              onChange: handleTitleChange,
              disabled: processing
            }
          ),
          errors && errors.title && /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-danger",
              style: { fontSize: "14px" },
              children: errors.title
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Form.Select,
          {
            className: errors && errors.category_id ? "is-invalid" : "",
            "aria-label": "Select tutorial category",
            size: "sm",
            onChange: handleTitleChange,
            name: "category_id",
            disabled: processing,
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Open to select category" }),
              categories && categories.map((category) => /* @__PURE__ */ jsx(
                "option",
                {
                  value: category.id,
                  children: capitalize(category.category)
                },
                `cat-${category.id}`
              ))
            ]
          }
        ),
        errors && errors.category_id && /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-danger",
            style: { fontSize: "14px" },
            children: errors.category_id
          }
        ),
        /* @__PURE__ */ jsxs(
          Form.Group,
          {
            className: "mb-2 mt-2",
            controlId: "prologue,textarea",
            children: [
              /* @__PURE__ */ jsx(Form.Label, { children: "Prologue" }),
              /* @__PURE__ */ jsx(
                Form.Control,
                {
                  as: "textarea",
                  rows: 3,
                  className: errors && errors.prologue ? "is-invalid" : "",
                  placeholder: "Isikan prologoe untuk ditampilkan dihalaman list dan tutorial.",
                  name: "prologue",
                  disabled: processing,
                  ref: prologueRef,
                  onChange: handleTitleChange
                }
              ),
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "text-muted",
                  style: { fontSize: "14px" },
                  children: [
                    prologueRef.current ? prologueRef.current.value.length : 0,
                    " ",
                    "/ 1000"
                  ]
                }
              ),
              /* @__PURE__ */ jsx("br", {}),
              errors && errors.prologue && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "text-danger",
                  style: { fontSize: "14px" },
                  children: errors.prologue
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Modal.Footer, { children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "secondary",
            onClick: handleHide,
            size: "sm",
            disabled: processing,
            children: "Close"
          }
        ),
        processing ? /* @__PURE__ */ jsxs(Button, { variant: "primary", size: "sm", disabled: true, children: [
          /* @__PURE__ */ jsx(
            Spinner,
            {
              as: "span",
              animation: "grow",
              size: "sm",
              role: "status",
              "aria-hidden": "true"
            }
          ),
          " ",
          "Loading..."
        ] }) : /* @__PURE__ */ jsx(Button, { variant: "primary", type: "submit", size: "sm", children: "Save Changes" })
      ] })
    ] })
  ] });
}
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AddTitleModal
}, Symbol.toStringTag, { value: "Module" }));
function Create({ categories, titles, tutorial, edit_mode }) {
  const { flash } = usePage().props;
  const [flashShow, setFlashShow] = useState(true);
  const [showAddTitleModal, setShowAddTitleModal] = useState(false);
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("---");
  const [isProcess, setIsProcess] = useState(false);
  const [errors, setErrors] = useState();
  const editorRef = useRef();
  const titleRef = useRef();
  const toolbarRef = useRef();
  const handleFlashClose = () => {
    setFlashShow(false);
    router.get("/tutorials/all/create");
  };
  const handleCLoseAddTitleModal = () => {
    setShowAddTitleModal(false);
  };
  const handleTitleChange = (e) => {
    const title_id = titleRef.current.value;
    if (title_id !== "") {
      setTitle(title_id);
      const category_id = titles.filter((item) => item.id == title_id)[0].category_id;
      const category_name = categories.filter(
        (item) => item.id == category_id
      )[0].category;
      setCategory(category_name);
    } else {
      setCategory("---");
    }
  };
  const saveTutorial = () => {
    const url = "/tutorials/all";
    const data = {
      title: parseInt(title),
      sub_title: subTitle,
      tutorial_id: edit_mode ? tutorial.id : null,
      content: $(editorRef.current).summernote("code")
    };
    router.post(url, data, {
      onError: (errors2) => {
        setErrors(errors2);
      },
      onStart: () => setIsProcess(true),
      onFinish: () => setIsProcess(false),
      onSuccess: () => setFlashShow(true)
    });
  };
  useEffect(() => {
    if (tutorial) {
      $(editorRef.current).summernote("code", tutorial.contents);
      handleTitleChange();
      setSubTitle(tutorial.sub_title);
    } else {
      $(editorRef.current).summernote({
        placeholder: "Tulis isi tutorial disini",
        callbacks: {
          onInit: function() {
            $(editorRef.current).summernote("code", "");
          },
          onFullscreen: function(isFullscreen) {
            if (isFullscreen) {
              toolbarRef.current.style.display = "none";
              console.log("Full");
            } else {
              toolbarRef.current.style.display = "flex";
              console.log("Not Full");
            }
          }
        }
      });
    }
  }, []);
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      AddTitleModal,
      {
        show: showAddTitleModal,
        handleClose: handleCLoseAddTitleModal,
        categories
      }
    ),
    flash.message && /* @__PURE__ */ jsx(
      FlashMessage,
      {
        flashShow,
        handleClose: handleFlashClose,
        message: flash.message,
        success: flash.success
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between", ref: toolbarRef, children: [
      /* @__PURE__ */ jsxs("h4", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary fw-bolder", children: edit_mode ? "Update" : "Create" }),
        " ",
        "Tutorial"
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        !edit_mode && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "primary",
              onClick: () => setShowAddTitleModal(true),
              className: "btn-sm",
              disabled: isProcess,
              children: [
                /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faPlus }),
                " Add Title"
              ]
            }
          ),
          " "
        ] }),
        isProcess ? /* @__PURE__ */ jsxs(Button, { variant: "success", size: "sm", disabled: true, children: [
          /* @__PURE__ */ jsx(
            Spinner,
            {
              as: "span",
              animation: "grow",
              size: "sm",
              role: "status",
              "aria-hidden": "true"
            }
          ),
          " ",
          "Loading..."
        ] }) : /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "success",
            size: "sm",
            onClick: saveTutorial,
            disabled: isProcess,
            children: [
              /* @__PURE__ */ jsx(FontAwesomeIcon, { icon: faFloppyDisk$1 }),
              " Save Tutorial"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsxs(Col, { xs: 12, lg: 4, children: [
        /* @__PURE__ */ jsxs(
          Form.Select,
          {
            className: `mb-2 ${errors && errors.title ? "is-invalid" : ""}`,
            ref: titleRef,
            "aria-label": "Select tutorial title",
            size: "sm",
            name: "title",
            onChange: handleTitleChange,
            disabled: isProcess,
            defaultValue: edit_mode ? tutorial.title_id : "",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Open to select title" }),
              titles && titles.map((value) => /* @__PURE__ */ jsx(
                "option",
                {
                  value: value.id,
                  children: value.title
                },
                `title-${value.id}`
              ))
            ]
          }
        ),
        errors && errors.title && /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-danger mb-2",
            style: { fontSize: "14px" },
            children: errors.title
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Col, { xs: 12, lg: 4, children: [
        /* @__PURE__ */ jsxs(InputGroup, { className: "mb-0", size: "sm", children: [
          /* @__PURE__ */ jsx(
            InputGroup.Text,
            {
              id: "sub_title-addon",
              className: "py-0 mb-2",
              children: "Sub Title"
            }
          ),
          /* @__PURE__ */ jsx(
            Form.Control,
            {
              className: `mb-2 ${errors && errors.sub_title ? "is-invalid" : ""}`,
              placeholder: "Sub title",
              "aria-label": "Sub title",
              "aria-describedby": "sub_title-addon",
              name: "sub_title",
              onChange: (e) => setSubTitle(e.target.value),
              disabled: isProcess,
              value: subTitle
            }
          )
        ] }),
        errors && errors.sub_title && /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-danger mb-2",
            style: { fontSize: "14px" },
            children: errors.sub_title
          }
        )
      ] }),
      /* @__PURE__ */ jsx(Col, { xs: 12, lg: 4, children: /* @__PURE__ */ jsxs("p", { className: "d-flex justify-content-end mb-2", children: [
        "Category:  ",
        /* @__PURE__ */ jsx("span", { className: "fw-bolder text-danger mb-2", children: capitalize(category) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Row, { style: { backgroundColor: "white" }, className: "d-flex", children: /* @__PURE__ */ jsxs(Col, { className: "mb-3", children: [
      /* @__PURE__ */ jsx("textarea", { name: "tutorial", ref: editorRef }),
      errors && errors.content && /* @__PURE__ */ jsx(
        "span",
        {
          className: "text-danger mb-2",
          style: { fontSize: "14px" },
          children: errors.content
        }
      )
    ] }) })
  ] });
}
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Create
}, Symbol.toStringTag, { value: "Module" }));
function Tutorials({ titles }) {
  const { auth } = usePage().props;
  useEffect(() => {
    console.log();
  }, []);
  return /* @__PURE__ */ jsxs(Layout, { children: [
    auth.user && auth.user.role !== "visitor" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Link, { href: "/tutorials/all/create", children: /* @__PURE__ */ jsx(Button, { variant: "primary", className: "btn-sm mt-2", children: "Create Tutorial" }) }),
      " ",
      /* @__PURE__ */ jsx(Link, { href: "/tutorials/list", children: /* @__PURE__ */ jsx(Button, { variant: "success", size: "sm", className: "mt-2", children: "Tutorial List" }) })
    ] }),
    titles && Object.keys(titles).map((category) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs("h3", { className: "mt-2", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logo[category],
            alt: category,
            width: 60
          }
        ),
        " ",
        /* @__PURE__ */ jsx("span", { className: "align-bottom", children: capitalize(category) })
      ] }),
      /* @__PURE__ */ jsx(Row, { children: titles[category].map((title) => /* @__PURE__ */ jsxs(Col, { md: "12", lg: "6", children: [
        /* @__PURE__ */ jsx("h5", { children: title.title }),
        /* @__PURE__ */ jsxs("h6", { className: "mb-0", children: [
          "Author: ",
          title.author.name
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "text-muted",
            style: { fontSize: "14px" },
            children: title.updated_at
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "mt-2", children: title.prologue }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline-primary",
            size: "sm",
            type: "button",
            onClick: () => router.get(
              "/tutorials/title/" + title.id
            ),
            children: "Details"
          }
        )
      ] }, title.id)) }),
      /* @__PURE__ */ jsx("hr", {})
    ] }, category))
  ] });
}
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Tutorials
}, Symbol.toStringTag, { value: "Module" }));
function ShowTutorial({ title, tutorial, titleByCategory }) {
  const getTutorialData = (titleId, tutorialId) => {
    router.visit(
      "/tutorials/title/" + titleId + "?tutorial_id=" + tutorialId,
      { only: ["tutorial"], preserveScroll: true }
    );
  };
  useEffect(() => {
  }, []);
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Col, { md: "9", sm: "12", className: "mb-3", children: /* @__PURE__ */ jsx(Card, { bg: "light", className: "rounded-3", children: /* @__PURE__ */ jsxs(Card.Body, { className: "py-2", children: [
      /* @__PURE__ */ jsxs(Card.Title, { children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logo[title.category.category],
            height: "26",
            className: "align-middle"
          }
        ),
        " ",
        /* @__PURE__ */ jsx("span", { className: "align-middle", children: title.title })
      ] }),
      /* @__PURE__ */ jsxs(Card.Subtitle, { className: "mb-2 text-muted", children: [
        "Author: ",
        title.author.name
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      /* @__PURE__ */ jsx(Card.Text, { style: { textAlign: "justify" }, children: title.prologue }),
      /* @__PURE__ */ jsx(Accordion, { defaultActiveKey: "0", className: "mb-3", children: /* @__PURE__ */ jsxs(Accordion.Item, { eventKey: "0", children: [
        /* @__PURE__ */ jsx(Accordion.Header, { children: "Contents" }),
        /* @__PURE__ */ jsx(Accordion.Body, { children: /* @__PURE__ */ jsx(ListGroup, { as: "ol", numbered: true, children: title.tutorials.map((tutorial2) => /* @__PURE__ */ jsx(
          ListGroup.Item,
          {
            action: true,
            onClick: () => getTutorialData(
              title.id,
              tutorial2.id
            ),
            children: tutorial2.sub_title
          },
          tutorial2.id
        )) }) })
      ] }) }),
      tutorial && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(Card.Subtitle, { className: "mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-decoration-underline", children: tutorial.sub_title }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "text-muted",
              style: { fontSize: "14px" },
              children: tutorial.updated_at
            }
          ),
          /* @__PURE__ */ jsx("br", {})
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: { textAlign: "justify" },
            dangerouslySetInnerHTML: {
              __html: tutorial.contents
            }
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(Col, { md: "3", sm: "12", children: /* @__PURE__ */ jsx(Card, { bg: "light", className: "rounded-3", children: /* @__PURE__ */ jsxs(Card.Body, { className: "py-3", children: [
      /* @__PURE__ */ jsx(Card.Subtitle, { className: "mb-0", children: "Related Contents:" }),
      /* @__PURE__ */ jsx(ListGroup, { as: "ol", variant: "flush", children: titleByCategory.length > 0 ? titleByCategory.map((title2) => /* @__PURE__ */ jsx(
        ListGroup.Item,
        {
          as: Link,
          href: "/tutorials/title/" + title2.id,
          children: title2.title
        },
        title2.id
      )) : /* @__PURE__ */ jsx(ListGroup.Item, { children: "No related contents" }) })
    ] }) }) })
  ] }) });
}
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ShowTutorial
}, Symbol.toStringTag, { value: "Module" }));
function TutorialList({ titles }) {
  const { auth } = usePage().props;
  const [processing, setProcessing] = useState(false);
  const publishSubTitle = (id) => {
    const confirmUser = confirm(
      "Dengan mengubah status menjadi publish, akan terlihat pada halaman RANZ oleh semua pengunjung. Apakah anda yakin publish tutorial ini?"
    );
    if (confirmUser) {
      router.post("/tutorials/list/publish/" + id, id, {
        onStart: () => setProcessing(true),
        onFinish: () => setProcessing(false)
      });
    }
  };
  const editTutorial = (id) => {
    router.get("/tutorials/all/" + id + "/edit");
  };
  function Process({ children, numCols = 7 }) {
    const tableCell = Array.from({ length: numCols }).fill(null).map(() => /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Placeholder, { as: "p", animation: "glow", children: /* @__PURE__ */ jsx(Placeholder, { xs: 12, size: "lg" }) }) }, Math.random()));
    return /* @__PURE__ */ jsx(Fragment, { children: processing ? /* @__PURE__ */ jsx("tr", { children: tableCell }) : children });
  }
  useEffect(() => {
  });
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsxs(Table, { className: "table caption-top", size: "sm", children: [
    /* @__PURE__ */ jsx("caption", { children: "List of tutorials" }),
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-center", children: [
      /* @__PURE__ */ jsx("th", { children: "#" }),
      /* @__PURE__ */ jsx("th", { children: "Title" }),
      /* @__PURE__ */ jsx("th", { children: "Category" }),
      /* @__PURE__ */ jsx("th", { children: "Subtitle" }),
      /* @__PURE__ */ jsx("th", { children: "Author" }),
      /* @__PURE__ */ jsx("th", { children: "Publish" }),
      /* @__PURE__ */ jsx("th", { children: "Action" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx(Process, { children: titles.length > 0 ? /* @__PURE__ */ jsx(Fragment, { children: titles.map((title, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx(
          "td",
          {
            rowSpan: title.tutorials.length + 1,
            children: index + 1
          }
        ),
        /* @__PURE__ */ jsx(
          "td",
          {
            rowSpan: title.tutorials.length + 1,
            children: title.title
          }
        ),
        /* @__PURE__ */ jsx(
          "td",
          {
            rowSpan: title.tutorials.length + 1,
            children: capitalize(
              title.category.category
            )
          }
        )
      ] }, title.id),
      title.tutorials && title.tutorials.map((tutorial) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: tutorial.sub_title }),
        /* @__PURE__ */ jsx("td", { className: "text-center", children: title.author.name }),
        /* @__PURE__ */ jsx("td", { className: "text-center", children: tutorial.is_publish ? /* @__PURE__ */ jsx(
          Badge,
          {
            pill: true,
            bg: "secondary",
            children: "Published"
          }
        ) : /* @__PURE__ */ jsx(
          Badge,
          {
            pill: true,
            bg: "warning",
            children: "Draft"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "text-center", children: tutorial.is_publish ? /* @__PURE__ */ jsx(Fragment, { children: auth.user.id == title.author.id ? /* @__PURE__ */ jsx(
          Badge,
          {
            pill: true,
            bg: "primary",
            style: {
              cursor: "pointer"
            },
            onClick: () => editTutorial(
              tutorial.id
            ),
            children: "Edit"
          }
        ) : "-" }) : /* @__PURE__ */ jsx(Fragment, { children: auth.user.id == title.author.id ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Badge,
            {
              pill: true,
              bg: "success",
              style: {
                cursor: "pointer"
              },
              onClick: () => publishSubTitle(
                tutorial.id
              ),
              children: "Publish"
            }
          ),
          " ",
          /* @__PURE__ */ jsx(
            Badge,
            {
              pill: true,
              bg: "primary",
              style: {
                cursor: "pointer"
              },
              onClick: () => editTutorial(
                tutorial.id
              ),
              children: "Edit"
            }
          )
        ] }) : "-" }) })
      ] }, tutorial.id))
    ] }, title.id)) }) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 7, className: "text-center", children: "No Data" }) }) }) })
  ] }) });
}
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: TutorialList
}, Symbol.toStringTag, { value: "Module" }));
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/About/Index.jsx": __vite_glob_0_0, "./Pages/Admin/Index.jsx": __vite_glob_0_1, "./Pages/Auth/AuthLayout.jsx": __vite_glob_0_2, "./Pages/Auth/Login.jsx": __vite_glob_0_3, "./Pages/Auth/Register.jsx": __vite_glob_0_4, "./Pages/Auth/VerifyEmail.jsx": __vite_glob_0_5, "./Pages/Components/Editor.jsx": __vite_glob_0_6, "./Pages/Components/FlashMessage.jsx": __vite_glob_0_7, "./Pages/Components/Footer.jsx": __vite_glob_0_8, "./Pages/Components/Layout.jsx": __vite_glob_0_9, "./Pages/Components/Menu.jsx": __vite_glob_0_10, "./Pages/Components/OverlayTooltip.jsx": __vite_glob_0_11, "./Pages/Components/SideMenu.jsx": __vite_glob_0_12, "./Pages/Config/Helper.jsx": __vite_glob_0_13, "./Pages/Home.jsx": __vite_glob_0_14, "./Pages/HomeEdit.jsx": __vite_glob_0_15, "./Pages/Tutorials/Components/AddTitleModal.jsx": __vite_glob_0_16, "./Pages/Tutorials/Create.jsx": __vite_glob_0_17, "./Pages/Tutorials/Index.jsx": __vite_glob_0_18, "./Pages/Tutorials/ShowTutorial.jsx": __vite_glob_0_19, "./Pages/Tutorials/TutorialList.jsx": __vite_glob_0_20 });
      return pages[`./Pages/${name}.jsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
