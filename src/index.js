import Resolver from '@forge/resolver';
import { storage, startsWith } from '@forge/api';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define("handleChangeWrite", async ({ payload, context }) => {
    await storage.set('stanRetroKey', 1);
    let ZapisObrazka = false;
    //console.log("pytania");
    let Pytania = payload.pytania;
    //console.log(Pytania);
    let pobranyObrazek = payload.name;

    await storage.set('obrazek', pobranyObrazek);

    let num = 0;
    if(pobranyObrazek==="Mountain.jpg"){num=0;}
    if(pobranyObrazek==="sailboat.jpg"){num=1;}
    if(pobranyObrazek==="ManWoman.jpg"){num=2;}

    storage.set('Pytanie1', Pytania[num].Pytanie1);
    storage.set('Pytanie2', Pytania[num].Pytanie2);
    storage.set('Pytanie3', Pytania[num].Pytanie3);
    storage.set('stanRetroKey', (num+1));
    console.log("handleChangeWrite index.js");

    ZapisObrazka = true;
    return ZapisObrazka;
});

resolver.define("handleChangeRead", async (req) => {
    let obrazek = await storage.get('obrazek');
    let zmienna = "./"+obrazek;
    return zmienna;

});

resolver.define("checkRetro", async (req) => {
    let RetrospectiveVar = await storage.get('stanRetroKey');
    let stanRetroVar = 0;
    if(!RetrospectiveVar)
    {
        stanRetroVar = 0;
    }
    else
    {
        stanRetroVar = RetrospectiveVar;
    }
    return stanRetroVar;
    //return handleChange.results;
});

resolver.define("sleep", async (req) => {
    await sleep(1000);
    return true;
});

resolver.define("Pytanie", async ({ payload }) => {
    let CheckPytanie = payload.pyt;

    let Pytanie = await storage.get(CheckPytanie);

    if(!(Pytanie))
    {
        storage.set(CheckPytanie, 'Niezdefiniowane');
        Pytanie='Niezdefiniowane !';
    }
    return Pytanie;
});

resolver.define("OdczytData", async ({ payload }) => {
    let CheckData = payload.zdanie;

    let odczytaneDane = await storage.query().where('key', startsWith(CheckData)).limit(20).getMany();
    let wielkosc = odczytaneDane.results.length;

    return odczytaneDane.results;
});

 resolver.define("zapisData", async ({ payload, context }) => {
    let CheckData = payload.zdanie;
    const opinia = payload.name;
    let zapisDanych = false;

    const pobraneDane = payload.dane;
    let odczytaneDane = await storage.query().where('key', startsWith(CheckData)).limit(20).getMany();
    let numer = odczytaneDane.results.length;
    await storage.set(CheckData+numer, opinia);
    zapisDanych = true;
    return zapisDanych;
});
 resolver.define("zapisDanych", async ({ payload, context }) => {
    const opinia = payload.name;
    let zapisDanych = false;

    const pobraneDane = payload.dane;
    let odczytaneDane = await storage.query().where('key', startsWith('Zdanie1-key')).limit(20).getMany();
    let numer = odczytaneDane.results.length;
    await storage.set('Zdanie1-key'+numer, opinia);
    zapisDanych = true;
    return zapisDanych;
});

 resolver.define("zapisDanych2", async ({ payload, context }) => {
    const opinia = payload.name;
    let zapisDanych = false;
    const pobraneDane = payload.dane2;
    let odczytaneDane = await storage.query().where('key', startsWith('Zdanie2-key')).limit(20).getMany();
    let numer = odczytaneDane.results.length;
    await storage.set('Zdanie2-key'+numer, opinia);
    zapisDanych = true;
    return zapisDanych;
});

 resolver.define("zapisDanych3", async ({ payload, context }) => {
    const opinia = payload.name;
    let zapisDanych = false;
    const pobraneDane = payload.dane3;
    let odczytaneDane = await storage.query().where('key', startsWith('Zdanie3-key')).limit(20).getMany();
    let numer = odczytaneDane.results.length;
    await storage.set('Zdanie3-key'+numer, opinia);
    zapisDanych = true;
    return zapisDanych;
});
resolver.define("usunDaneStanRetro", async (req) => {
    storage.set('stanRetroKey',0)
});
resolver.define("usunDane", async (req) => {
    await storage.set('CleanedRetrospective', 'true');
    let odczytaneDane = await storage.query().where('key', startsWith('count-key')).limit(20).getMany();
    let wielkosc = odczytaneDane.results.length;
    for (let i=0; i<=wielkosc; i++){
        storage.delete('count-key'+i);
    }

    odczytaneDane = await storage.query().where('key', startsWith('Zdanie1-key')).limit(20).getMany();
    wielkosc = odczytaneDane.results.length;
    for (let i=0; i<=wielkosc; i++){
        storage.delete('Zdanie1-key'+i);
    }

    odczytaneDane = await storage.query().where('key', startsWith('Zdanie2-key')).limit(20).getMany();
    wielkosc = odczytaneDane.results.length;
    for (let i=0; i<=wielkosc; i++){
        storage.delete('Zdanie2-key'+i);
    }

    odczytaneDane = await storage.query().where('key', startsWith('Zdanie3-key')).limit(20).getMany();
    wielkosc = odczytaneDane.results.length;
    for (let i=0; i<=wielkosc; i++){
        storage.delete('Zdanie3-key'+i);
    }

    storage.set('stanRetroKey',0)
    storage.delete('undefined');

    let usunDane = true;
    return usunDane;
});

export const handler = resolver.getDefinitions();