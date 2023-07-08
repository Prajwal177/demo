#include<iostream>
#include<cmath>

using namespace std;

int main()
{
    cout << "Quadratic Equation Solver:" << endl;
    cout << "Enter values of a, b and c for eqn ax^2+bx+c=0:" << endl;
    int a, b, c, d;
    double x1, x2, i1, i2;
    cin >> a >> b >> c;
    d = b*b - 4*a*c;

    if (d>0)
    {
        cout << "Distinct roots and real" << endl;
        x1 = (-b + sqrt(d))/(2*a);
        x2 = (-b - sqrt(d))/(2*a);
        cout << "x1 = " << x1 << " x2 = " << x2 << endl; 
    }
    else if (d<0)
    {
        cout << "Roots are imaginary" << endl;
        x1 = -(float)b/(2*a);
        x2 = x1;
        i1 = sqrt(-d)/(2*a);
        cout << "x1 = (" << x1 << ", " <<  i1 << ") " << endl;
        cout << "x2 = (" << x2 << ", - " << i1 << ") " << endl;
    }
    else if (d=0)
    {
        cout << "Same and real roots" << endl;
        x1 = (-b)/(2*a);
        cout << "x1 = " << x1 << " x2 = " << x1 << endl; 
    }
    return 0;
}