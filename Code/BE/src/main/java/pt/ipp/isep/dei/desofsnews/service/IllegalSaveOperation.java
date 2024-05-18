package pt.ipp.isep.dei.desofsnews.service;

public class IllegalSaveOperation extends Exception{

    public IllegalSaveOperation(String string, Exception e) {
        super(string, e);
    }

}
