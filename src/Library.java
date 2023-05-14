import javax.sound.midi.SysexMessage;
import java.util.ArrayList;
public class Library {
    private ArrayList<Book> resources;

    public Library() {
        resources = new ArrayList<Book>();
    }

    public boolean catalogueCheck(Book book) {
        if (resources.contains(book)) {
            System.out.println(book.getTitle() + " is available");
            return true;
        } else {
            System.out.println(book.getTitle() + " is not available");
            return false;
        }
    }


    public void editTitle(Book book, String newTitle) {
        if (resources.contains(book)) {
            book.setTitle(newTitle); }
        else {
            System.out.println("Book not in catalogue!");
        }
    }

    public void searchTitle(String title) {
        int index = 0;
        for (Book book: resources) {
            if (book.getTitle().contains(title)) {
                book.printAllDetails();
                index++;
            }
        }
        System.out.println("Total number of titles found was: " + index);
        System.out.println();
    }

    public void searchAuthor(String author) {
        int index = 0;
        for (Book book: resources) {
            if (book.getAuthor().contains(author)) {
                book.printAllDetails();
                index++;
            }
        }
        System.out.println("Total number of authors found was: " + index);
        System.out.println();
    }

    public void removeBook(Book book) {
        if (resources.contains(book)) {
            resources.remove(book);
        }
        else {
            System.out.println("Book not in catalogue");
        }
    }

    public void printAllDetails() {
        for (Book book: resources){
            book.printAllDetails();
        }
    }

    public int numberOfBooks() {
        System.out.println("Total number of book within library: " + resources.size());
        System.out.println();
        return resources.size();
    }

    public void addBook(Book book) {
        if (resources.contains(book)) {
            System.out.println("ERROR: Book already in library!!!!");
        }
        else {
            resources.add(book);
        }
    }

    public void borrowBook(Book book, LibraryMember member) {
        //Borrow book not in library *this works*
        if (resources.contains(book) == false) {
                System.out.println("Book not in catalogue!");
            }
        int counter = 0;
        while (counter < resources.size()){
            Book item = resources.get(counter);

            //Book can't be borrowed by two members at the same time.
             if (member.equals(item)) {
                 System.out.println("Book is currently on loan to another member.");
                 counter++;
                 break;
             }
             //No more than 4 books can be borrowed *this works*
             else if (member.numOfBooks() >= 4) {
                 System.out.println("Can't borrow more than 4 books at one time.");
                 counter++;
                 break;
             }
             else {
                 member.borrowBook(book);
                 //book.setMember();
                 counter++;
                 break;

             }
        }
    }


}
