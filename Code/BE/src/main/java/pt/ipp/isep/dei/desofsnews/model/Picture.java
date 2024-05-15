package pt.ipp.isep.dei.desofsnews.model;

import jakarta.persistence.Entity;

@Entity
public class Picture {
    private String url;
    private String caption;

    public Picture(String url, String caption) {
        this.url = url;
        this.caption = caption;
    }

    public String getUrl() {
        return this.url;
    }

    public String getCaption() {
        return this.caption;
    }
}
