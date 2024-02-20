namespace backend.Models;

public class Paste
{
    public Paste()
    {
        CreatedAt = DateTime.Now;
    }

    public long Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string Password { get; set; }
    public DateTime CreatedAt { get; set; }
}