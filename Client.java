import java.rmi.Remote;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;
import java.util.Scanner;

// ================= INTERFACES =================

interface AddInterface extends Remote {
    int add(int x, int y) throws RemoteException;
}

interface SubInterface extends Remote {
    int sub(int x, int y) throws RemoteException;
}

interface MulInterface extends Remote {
    int mul(int x, int y) throws RemoteException;
}

interface DivInterface extends Remote {
    int div(int x, int y) throws RemoteException;
}

// ================= IMPLEMENTATION =================

class Impl extends UnicastRemoteObject
        implements AddInterface, SubInterface, MulInterface, DivInterface {

    public Impl() throws RemoteException {
        super();
    }

    public int add(int x, int y) throws RemoteException {
        return x + y;
    }

    public int sub(int x, int y) throws RemoteException {
        return x - y;
    }

    public int mul(int x, int y) throws RemoteException {
        return x * y;
    }

    public int div(int x, int y) throws RemoteException {
        return x / y;
    }
}

// ================= SERVER =================

class Server {
    public static void main(String[] args) throws Exception {

        LocateRegistry.createRegistry(6000);

        Impl obj = new Impl();

        Naming.rebind("rmi://localhost:6000/sonoo", obj);

        System.out.println("Server Started");
    }
}

// ================= CLIENT =================

public class Client {

    public static void main(String[] args) throws Exception {

        Scanner sc = new Scanner(System.in);

        while (true) {

            System.out.println("\n1. Addition");
            System.out.println("2. Subtraction");
            System.out.println("3. Multiplication");
            System.out.println("4. Division");
            System.out.println("5. Exit");

            System.out.print("Enter the option: ");
            int opt = sc.nextInt();

            if (opt == 5) {
                break;
            }

            System.out.print("Enter the first number: ");
            int a = sc.nextInt();

            System.out.print("Enter the second number: ");
            int b = sc.nextInt();

            int n;

            switch (opt) {

                case 1:
                    AddInterface obj1 =
                            (AddInterface) Naming.lookup(
                                    "rmi://localhost:6000/sonoo");

                    n = obj1.add(a, b);
                    System.out.println("Addition = " + n);
                    break;

                case 2:
                    SubInterface obj2 =
                            (SubInterface) Naming.lookup(
                                    "rmi://localhost:6000/sonoo");

                    n = obj2.sub(a, b);
                    System.out.println("Subtraction = " + n);
                    break;

                case 3:
                    MulInterface obj3 =
                            (MulInterface) Naming.lookup(
                                    "rmi://localhost:6000/sonoo");

                    n = obj3.mul(a, b);
                    System.out.println("Multiplication = " + n);
                    break;

                case 4:
                    if (b == 0) {
                        System.out.println("Cannot divide by zero");
                        break;
                    }

                    DivInterface obj4 =
                            (DivInterface) Naming.lookup(
                                    "rmi://localhost:6000/sonoo");

                    n = obj4.div(a, b);
                    System.out.println("Division = " + n);
                    break;

                default:
                    System.out.println("Invalid option");
            }
        }

        sc.close();
    }
}
