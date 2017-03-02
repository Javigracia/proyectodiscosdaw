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
    public class VdiscoController : ApiController
    {
        private DiscosEntities db = new DiscosEntities();

        // GET: api/Vdisco
        public IQueryable<v_disco> Getv_disco()
        {
            return db.v_disco;
        }

        // GET: api/Vdisco/5
        [ResponseType(typeof(v_disco))]
        public IHttpActionResult Getv_disco(int id)
        {
            v_disco v_disco = db.v_disco.Find(id);
            if (v_disco == null)
            {
                return NotFound();
            }

            return Ok(v_disco);
        }

        // PUT: api/Vdisco/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putv_disco(int id, v_disco v_disco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != v_disco.IdDisco)
            {
                return BadRequest();
            }

            db.Entry(v_disco).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!v_discoExists(id))
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

        // POST: api/Vdisco
        [ResponseType(typeof(v_disco))]
        public IHttpActionResult Postv_disco(v_disco v_disco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.v_disco.Add(v_disco);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (v_discoExists(v_disco.IdDisco))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = v_disco.IdDisco }, v_disco);
        }

        // DELETE: api/Vdisco/5
        [ResponseType(typeof(v_disco))]
        public IHttpActionResult Deletev_disco(int id)
        {
            v_disco v_disco = db.v_disco.Find(id);
            if (v_disco == null)
            {
                return NotFound();
            }

            db.v_disco.Remove(v_disco);
            db.SaveChanges();

            return Ok(v_disco);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool v_discoExists(int id)
        {
            return db.v_disco.Count(e => e.IdDisco == id) > 0;
        }
    }
}