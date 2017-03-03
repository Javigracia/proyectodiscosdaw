﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiscosDaw.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Votar()
        {
            Cliente user = (Cliente) Session["USUARIO"];
            ViewBag.idUsuario = user.id;
            return View();
        }
    }
}