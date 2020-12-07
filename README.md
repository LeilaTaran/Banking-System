# Banking-System

I dette forløb udvikles et simpelt banksystem til en bankkassere, der har til formål at håndtere systemets klienter (clients) og konto (accounts). Systemets skal understøttes af CRUD (Create, Read, Update, Delete)funktioner ved håndtering af data fra henholsvis klienter og konto samt opfylde følgende funktionaliteter: 

**Client**
* Opret en ny client
* Hent eksisterende client 
* Opdater en clients oplysninger
* Slet en client

**Account**
* Opret en ny account
* Læs accountens balance
* Opdater accountens balance 
* Overfør penge fra en account til en anden 
* Slet en account

# IMPLEMENTERING
### Step 1 - Ændre URL for databasen
For at kunne køre programmet på egen PC, er det nødvendigt at ændre database URL'en følgende stedet:
* test.js filen - linje 16
* app.js filen - linje 13

Følgende URL kan eventuelt tilpasses:
indsæt url:

### Step 2 - Installer NPM 
Kør "npm install" fra mappen "\Banking-System", for at installere vores dependencies. 
```bash
npm install 
```

### Step 3 - filerne eksekveres
Kør "nmp start" i mappen "\Template" for at eksekvere følgende kommanoder:
* "npm run listen 9090"
* "load-balancer.js"
* "app.js" x2 --> 2 servere starter 
```bash
npm start 
```

### Step 4 - Test-filen
Kør "npm test" fra mappen "\Banking-System", for at teste systemet.

```bash
npm test
```
Hvis alt fungere vil der udskrives 15 passings.
