using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DiscosDaw;

namespace DiscosDaw.Controllers
{
    public class Vtop5Controller : ApiController
    {
        private DiscosEntities db = new DiscosEntities();

        // GET: api/Vtop5
        public IQueryable<v_top5> Getv_top5()
        {
            return db.v_top5;
        }

        // GET: api/Vtop5/5
        [ResponseType(typeof(v_top5))]
        public IHttpActionResult Getv_top5(int id)
        {
            v_top5 v_top5 = db.v_top5.Find(id);
            if (v_top5 == null)
            {
                return NotFound();
            }

            return Ok(v_top5);
        }

        // PUT: api/Vtop5/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putv_top5(int id, v_top5 v_top5)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != v_top5.IdDisco)
            {
                return BadRequest();
            }

            db.Entry(v_top5).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!v_top5Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Vtop5
        [ResponseType(typeof(v_top5))]
        public IHttpActionResult Postv_top5(v_top5 v_top5)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.v_top5.Add(v_top5);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (v_top5Exists(v_top5.IdDisco))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = v_top5.IdDisco }, v_top5);
        }

        // DELETE: api/Vtop5/5
        [ResponseType(typeof(v_top5))]
        public IHttpActionResult Deletev_top5(int id)
        {
            v_top5 v_top5 = db.v_top5.Find(id);
            if (v_top5 == null)
            {
                return NotFound();
            }

            db.v_top5.Remove(v_top5);
            db.SaveChanges();

            return Ok(v_top5);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool v_top5Exists(int id)
        {
            return db.v_top5.Count(e => e.IdDisco == id) > 0;
        }
    }
}