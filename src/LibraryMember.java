import java.util.ArrayList;
public class LibraryMember {
    private int memberID;
    private ArrayList<Book> borrowedBooks;
    private ArrayList<Library> messages; //the array type may be object
    private String memberName;

    public LibraryMember(String name, int id) {
        memberID = id;
        memberName = name;
        messages =  new ArrayList<Library>();
        borrowedBooks = new ArrayList<Book>();
    }

    public String getMemberName() {
        return memberName;
    }

    public int getMemberID() {
        return memberID;
    }

    public void setMemberID(int id) {
        memberID = id;
    }

    public void setMemberName(String name) {
        memberName = name;
    }

    public void printAllDetails() {
        System.out.println("Member Name: " + getMemberName());
        System.out.println("Member ID: " + getMemberID());
    }

    public void addBook(Book book) {
        if (borrowedBooks.contains(book)) {
            System.out.println("Book already borrowed");
        }
        else {
            borrowedBooks.add(book);
            System.out.println(book + " has been loaned.");
        }
    }

    public void printAllBorrowed() {
        for (Book book : borrowedBooks) {
            book.printAllDetails();
        }
    }

    public void printAllMessages() {
        for (Library message : messages) {
            System.out.println(message);
        }
    }

    public int numOfBooks() {
        System.out.println("Number of books on loan: " + borrowedBooks.size());
        return borrowedBooks.size();

    }

    public void borrowBook(Book book) {
        borrowedBooks.add(book);
    }
}
