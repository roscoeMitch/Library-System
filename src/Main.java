public class Main {
    public static void main(String[] args) {
        PhysicalBook pb1 = new PhysicalBook("1984", "George Orwell", 12345);
        EBook eb1 = new EBook("One flew over the cuckcoo's nest", "Ken Kesey", 55555, true);
        PhysicalBook pb2 = new PhysicalBook("Alice in wonderland", "Lewis Carroll", 6666666);
        EBook eb2 = new EBook("the Secret History", "Donna Tartt", 777777, false);
        PhysicalBook pb3 = new PhysicalBook("the goldfinch", "Donna Tartt", 456545);
        Library lib1 = new Library();
        LibraryMember lm1 = new LibraryMember("Ross", 123);
        LibraryMember lm2 = new LibraryMember("Ash", 456);


        lib1.addBook(eb1);
        lib1.addBook(pb1);
        lib1.addBook(eb2);
        lib1.addBook(pb3);
        lib1.addBook(pb2);
        lib1.editTitle(pb1, "animal farm");
        lib1.borrowBook(pb1, lm1);
        lib1.borrowBook(pb3, lm1);
        lib1.borrowBook(eb1, lm1);
        lib1.borrowBook(pb2, lm1);
        lm1.printAllDetails();






    }
}
