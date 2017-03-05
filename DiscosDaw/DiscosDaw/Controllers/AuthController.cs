using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace DiscosDaw.Controllers
{
    public class AuthController : Controller
    {

        [HttpGet]
        public ActionResult Login()
        {
            Session["USUARIO"] = null;
            //Session.Contents.RemoveAll();
            return View();
        }

        [HttpPost]
        public ActionResult Login(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                Cliente authUser = null;
                using (DiscosEntities discosEntities = new DiscosEntities())
                {
                    authUser = discosEntities.Clientes.FirstOrDefault(u => u.Email == cliente.Email && u.Password == cliente.Password);
                }
                if (authUser != null)
                {
                    FormsAuthentication.SetAuthCookie(authUser.Email, false);
                    Session["USUARIO"] = authUser;
                    return RedirectToAction("Index", "Admin");
                }
                else
                {
                    ModelState.AddModelError("CredentialError", "Usuario o contraseña incorrectos");
                    return View("ErrorLogin");
                }
            }
            else
                return View();
        }
    }
}