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
    public class PuntuacionesController : ApiController
    {
        private DiscosEntities db = new DiscosEntities();

        // GET: api/Puntuaciones
        public IQueryable<Puntuacion> GetPuntuacions()
        {
            return db.Puntuacions;
        }

        // GET: api/Puntuaciones/5
        [ResponseType(typeof(Puntuacion))]
        public IHttpActionResult GetPuntuacion(int id)
        {
            Puntuacion puntuacion = db.Puntuacions.Find(id);
            if (puntuacion == null)
            {
                return NotFound();
            }

            return Ok(puntuacion);
        }

        // PUT: api/Puntuaciones/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPuntuacion(int id, Puntuacion puntuacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != puntuacion.Id)
            {
                return BadRequest();
            }

            db.Entry(puntuacion).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PuntuacionExists(id))
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

        // POST: api/Puntuaciones
        [ResponseType(typeof(Puntuacion))]
        public IHttpActionResult PostPuntuacion(Puntuacion puntuacion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Puntuacions.Add(puntuacion);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = puntuacion.Id }, puntuacion);
        }

        // DELETE: api/Puntuaciones/5
        [ResponseType(typeof(Puntuacion))]
        public IHttpActionResult DeletePuntuacion(int id)
        {
            Puntuacion puntuacion = db.Puntuacions.Find(id);
            if (puntuacion == null)
            {
                return NotFound();
            }

            db.Puntuacions.Remove(puntuacion);
            db.SaveChanges();

            return Ok(puntuacion);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PuntuacionExists(int id)
        {
            return db.Puntuacions.Count(e => e.Id == id) > 0;
        }
    }
}