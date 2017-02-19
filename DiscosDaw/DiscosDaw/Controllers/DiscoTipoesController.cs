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
    public class DiscoTipoesController : ApiController
    {
        private DiscosEntities db = new DiscosEntities();

        // GET: api/DiscoTipoes
        public IQueryable<DiscoTipo> GetDiscoTipoes()
        {
            return db.DiscoTipoes;
        }

        // GET: api/DiscoTipoes/5
        [ResponseType(typeof(DiscoTipo))]
        public IHttpActionResult GetDiscoTipo(int id)
        {
            DiscoTipo discoTipo = db.DiscoTipoes.Find(id);
            if (discoTipo == null)
            {
                return NotFound();
            }

            return Ok(discoTipo);
        }

        // PUT: api/DiscoTipoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutDiscoTipo(int id, DiscoTipo discoTipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != discoTipo.Id)
            {
                return BadRequest();
            }

            db.Entry(discoTipo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DiscoTipoExists(id))
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

        // POST: api/DiscoTipoes
        [ResponseType(typeof(DiscoTipo))]
        public IHttpActionResult PostDiscoTipo(DiscoTipo discoTipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.DiscoTipoes.Add(discoTipo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (DiscoTipoExists(discoTipo.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = discoTipo.Id }, discoTipo);
        }

        // DELETE: api/DiscoTipoes/5
        [ResponseType(typeof(DiscoTipo))]
        public IHttpActionResult DeleteDiscoTipo(int id)
        {
            DiscoTipo discoTipo = db.DiscoTipoes.Find(id);
            if (discoTipo == null)
            {
                return NotFound();
            }

            db.DiscoTipoes.Remove(discoTipo);
            db.SaveChanges();

            return Ok(discoTipo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DiscoTipoExists(int id)
        {
            return db.DiscoTipoes.Count(e => e.Id == id) > 0;
        }
    }
}