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
    public class DiscoesController : ApiController
    {
        private DiscosEntities db = new DiscosEntities();

        // GET: api/Discoes
        public IQueryable<Disco> GetDiscoes()
        {
            return db.Discoes;
        }

        // GET: api/Discoes/5
        [ResponseType(typeof(Disco))]
        public IHttpActionResult GetDisco(int id)
        {
            Disco disco = db.Discoes.Find(id);
            if (disco == null)
            {
                return NotFound();
            }

            return Ok(disco);
        }

        // PUT: api/Discoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDisco(int id, Disco disco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != disco.IdDisco)
            {
                return BadRequest();
            }

            db.Entry(disco).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiscoExists(id))
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

        // POST: api/Discoes
        [ResponseType(typeof(Disco))]
        public IHttpActionResult PostDisco(Disco disco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Discoes.Add(disco);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DiscoExists(disco.IdDisco))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = disco.IdDisco }, disco);
        }

        // DELETE: api/Discoes/5
        [ResponseType(typeof(Disco))]
        public IHttpActionResult DeleteDisco(int id)
        {
            Disco disco = db.Discoes.Find(id);
            if (disco == null)
            {
                return NotFound();
            }

            db.Discoes.Remove(disco);
            db.SaveChanges();

            return Ok(disco);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DiscoExists(int id)
        {
            return db.Discoes.Count(e => e.IdDisco == id) > 0;
        }
    }
}