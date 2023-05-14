public class Book {
    private String title;
    private String author;
    private int isbnNumber;

    public Book(String bookTitle, String authorName, int isbn) {
        title = bookTitle;
        author = authorName;
        isbnNumber = isbn;


    }
    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public int getIsbnNumber() {
        return isbnNumber;
    }

    public void setTitle(String newTitle) {
        title = newTitle;
    }

    public void setAuthor(String newAuthor) {
        author = newAuthor;
    }

    public void setIsbnNumber(int isbn) {
        isbnNumber = isbn;
    }

    public void printAllDetails() {
        System.out.println("Book Title: " + title);
        System.out.println("Author's Name: " + author);
        System.out.println("ISBN Number: " + isbnNumber);
    }
}
