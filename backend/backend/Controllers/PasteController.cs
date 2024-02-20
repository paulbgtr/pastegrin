using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("[controller]")]
[ApiController]
public class PasteController : ControllerBase
{
    private readonly ApiContext _context;

    public PasteController(ApiContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public JsonResult GetPaste(long id)
    {
        var paste = _context.Pastes.Find(id);

        if (paste == null)
            return new JsonResult($"Paste with an id {id} is not found") { StatusCode = 404 };

        return new JsonResult(paste);
    }

    [HttpPost]
    public JsonResult PostPaste(Paste paste)
    {
        var foundPaste = _context.Pastes.Find(paste.Id);

        if (foundPaste != null)
            return new JsonResult($"Paste with an id {paste.Id} already exists") { StatusCode = 400 };

        _context.Pastes.Add(paste);
        _context.SaveChanges();

        return new JsonResult(paste) { StatusCode = 201 };
    }

    [HttpDelete("{id}")]
    public JsonResult DeletePaste(long id)
    {
        var foundPaste = _context.Pastes.Find(id);

        if (foundPaste == null)
            return new JsonResult($"Paste with an id {id} is not found") { StatusCode = 404 };

        _context.Pastes.Remove(foundPaste);
        _context.SaveChanges();

        return new JsonResult($"Paste with an id {id} is deleted") { StatusCode = 200 };
    }

    [HttpPut("{id}")]
    public JsonResult PutPaste(long id, Paste paste)
    {
        var foundPaste = _context.Pastes.Find(id);

        if (foundPaste == null)
            return new JsonResult($"Paste with an id {id} is not found") { StatusCode = 404 };

        foundPaste.Title = paste.Title;
        foundPaste.Content = paste.Content;
        foundPaste.Password = paste.Password;

        _context.SaveChanges();

        return new JsonResult(foundPaste) { StatusCode = 200 };
    }
}