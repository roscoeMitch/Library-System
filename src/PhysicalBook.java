import java.util.ArrayList;
public class PhysicalBook extends Book {
    private LibraryMember member;
    private ArrayList<String> damages;

    public PhysicalBook(String title, String author, int isbnNumber) {
        super(title, author, isbnNumber);
        this.member = member;

    }

    public ArrayList getDamages() {
        return damages;
    }

    public void printAllDetails() {
        System.out.println("Book Title: " + getTitle());
        System.out.println("Author's Name: " + getAuthor());
        System.out.println("ISBN Number: " + getIsbnNumber());
        System.out.println("***************");
    }

    public void setMember(LibraryMember newMember) {
        this.member = newMember;
    }
}
