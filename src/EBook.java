public class EBook extends Book  {
    private boolean downloadable;

    public EBook(String title, String author, int isbnNumber, boolean downloadable) {
        super(title, author, isbnNumber);
        this.downloadable = downloadable;
    }

    public boolean getDownloadable() {
        return downloadable;
    }

    public void isDownloadable(boolean download) {
        downloadable = download;
    }

    public void printAllDetails() {
        System.out.println("Book Title: " +  getTitle());
        System.out.println("Author's Name: " + getAuthor());
        System.out.println("ISBN Number: " + getIsbnNumber());
        System.out.println("Downloadable: " + getDownloadable());
        System.out.println("***************");
    }
}


