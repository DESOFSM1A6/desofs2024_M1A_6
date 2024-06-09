package pt.ipp.isep.dei.desofsnews.model;

public enum Status {
    APPROVED("approved"),
    UNAPPROVED("unapproved"),
    PENDING("pending");
    private String stat;

    Status(String string) {
        this.stat = string;
    }

    @Override
    public String toString() {
        return stat;
    }
}
