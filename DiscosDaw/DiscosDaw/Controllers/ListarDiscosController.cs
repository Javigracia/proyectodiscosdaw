using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiscosDaw.Controllers
{
    public class ListarDiscosController : Controller
    {
        // GET: ListarDiscos
        public ActionResult Index()
        {
            return View();
        }
    }
}