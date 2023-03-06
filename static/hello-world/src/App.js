import React, { useEffect, useState, Fragment } from 'react';
import { invoke } from '@forge/bridge';
import { storage } from '@forge/api';

import api, { route } from '@forge/api'
import { ChangeEvent } from 'react'
import { useInterval } from 'usehooks-ts'

import Form, { Field, FormFooter, HelperMessage, ErrorMessage } from '@atlaskit/form';
import Select from 'react-select';
import Textfield from '@atlaskit/textfield';
import Button from "@atlaskit/button";

import type {
  OptionProps,
  SingleValueProps,
  ValueType,
} from '@atlaskit/select/types';

import {
  FormContainer, FormToInput
} from './style';

import './cs.css';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
    var DEBUG = false;

    const [zapis, ustawZapis] = useState('');
    const [zapis2, ustawZapis2] = useState('');
    const [zapis3, ustawZapis3] = useState('');

    const [WyborSelecta, ustawSelecta] = useState('');
    const [obrazek,ustawObrazek] = useState('');

    const [divChangeRetrospective,divChangeRetrospectiveUstaw] = useState('SelectRetrospectiveHide');
    const [divQuestionsAnswers,divQuestionsAnswersUstaw] = useState('ImageRetrospectiveHide');
    const [StanRetro,ustawStanRetro] = useState(0);
    const [StanRetroOld,ustawStanRetroOld] = useState(0);

    const [dane,ustawDane] = useState(null);
    const [dane2,ustawDane2] = useState(null);
    const [dane3,ustawDane3] = useState(null);

    const [Pytanie1,ustawPytanie1] = useState('Wczytywanie Pytania');
    const [Pytanie2,ustawPytanie2] = useState('Wczytywanie Pytania');
    const [Pytanie3,ustawPytanie3] = useState('Wczytywanie Pytania');

    const[usuwanie,daneUsuniete] = useState("false");
    const[zapisywanie,daneZapisane] = useState("true");

    const defaultOptions = [
          { label: 'Góry i wspinaczka', value: 'Mountain.jpg' },
          { label: 'Łódź i skały', value: 'sailboat.jpg' },
          { label: 'Pan idzie z Panią za rękę', value: 'ManWoman.jpg' },
        ];

    const Pytania = [
        { Pytanie1: 'Co pomagało iść na przód?', Pytanie2: 'Co było pod górkę?', Pytanie3: 'Co mogło spowodować upadek?' },
        { Pytanie1: 'Co dawało Tobie wiatr w żagle?', Pytanie2: 'Co było Twoją kotwicą?', Pytanie3: 'Jakie ryzyka były na drodze do celu?' },
        { Pytanie1: 'Co trzymało Ciebie w dążeniu do celu?', Pytanie2: 'Co odwracało Twoją uwagę?', Pytanie3: 'Jak poprawić współpracę?' },
        ];

    let n=0;
    let StanRetrospektywy=0;
    let [StanRetrospektywy2,ustawStanRetrospektywy2] =useState(0);

      const [count, setCount] = useState(0)
      const [delay, setDelay] = useState(2000)
      const [isPlaying, setPlaying] = useState(true)

      useInterval(
        () => {
          if(DEBUG==true)
          {
              console.group('useInterval App:');
              setCount(count + 1)
              console.log("useInterval APP "+count);
              console.groupEnd();
          }
          odczytStanRetro();
        },
        isPlaying ? delay : null,
      )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(event.target.value))
  }

//  ### Start: Odczyty ###
  const odczytStanRetro = async () => {
    if(StanRetro>0)
    {
      if(StanRetroOld!=StanRetro)
      {
        odczytObrazka();
        odczytPytan();
      }
      odczytOdpowiedzi();
      if(StanRetroOld!=StanRetro)
      {
        divChangeRetrospectiveUstaw('SelectRetrospectiveHide');
        divQuestionsAnswersUstaw('ImageRetrospectiveShow');
      }
    }
    if(StanRetro==0)
    {
      divChangeRetrospectiveUstaw('SelectRetrospectiveShow');
      divQuestionsAnswersUstaw('ImageRetrospectiveHide');
    }
    ustawStanRetroOld(StanRetro);
    invoke('checkRetro').then(ustawStanRetro);
  }

  const odczytDanych = async () => {
    if(DEBUG==true)
    {
      console.group('Krystian LOG: odczytDanych');
      console.log("odczytDanych APP");
      console.groupEnd();
    }
    odczytStanRetro();
    odczytObrazka();
    odczytPytan();
    odczytOdpowiedzi;
  }

  const odczytPytan = async () => {
    invoke('Pytanie', { pyt: 'Pytanie1'}).then(ustawPytanie1);
    invoke('Pytanie', { pyt: 'Pytanie2'}).then(ustawPytanie2);
    invoke('Pytanie', { pyt: 'Pytanie3'}).then(ustawPytanie3);
    if(DEBUG==true)
    {
      console.group('Krystian LOG: odczytPytan');
      console.log("odczytPytan APP");
      console.log("Pytanie1 "+Pytanie1);
      console.log("Pytanie2 "+Pytanie2);
      console.log("Pytanie3 "+Pytanie3);
      console.groupEnd();
    }
  }

  const odczytOdpowiedzi = async () => {
    invoke('OdczytData', { zdanie: 'Zdanie1-key' }).then(ustawDane);
    invoke('OdczytData', { zdanie: 'Zdanie2-key' }).then(ustawDane2);
    invoke('OdczytData', { zdanie: 'Zdanie3-key' }).then(ustawDane3);
  }

  const odczytObrazka = async () => {
    invoke('handleChangeRead').then(ustawObrazek);
    if(DEBUG==true)
    {
      console.group('Krystian LOG: odczytObrazka');
      console.log(obrazek);
      console.groupEnd();
    }
  }
//  ### End: Odczyty ###

//  ### Start: Stale Odczyty dla divow ###
  const WyborSelectaRow = () => (
    <div>
      {obrazek ? '<img src="'+obrazek+'"/>' : 'Wczytuje obrazek...'}
    </div>
  );

  const obrazekOK = () => (
    <img src={obrazek}/>
  );

  const Rows = () => (
    <div>
      {dane ? dane.map(opinia => (
        <div className="comicGreen">{opinia.value}</div>
      ))
      : 'Wczytuje ...'}
    </div>
  );

  const Rows2 = () => (
    <div>
      {dane2 ? dane2.map(opinia => (
        <div className="comicred">{opinia.value}</div>
      ))
      : 'Wczytuje ...'}
    </div>
  );

  const Rows3 = () => (
    <div>
      {dane3 ? dane3.map(opinia => (
        <div className="comiclightblue">{opinia.value}</div>
      ))
      : 'Wczytuje ...'}
    </div>
  );
//  ### End: Stale Odczyty dla divow ###

//  ### Start: Zapisy ###
  const onSubmit = () => {
    invoke('zapisDanych', { name: zapis, zdanie: 'Zdanie1-key' }).then(daneZapisane);
    ustawZapis('');
    invoke('OdczytData', { zdanie: 'Zdanie1-key' }).then(ustawDane);
    if(DEBUG==true)
    {
      console.group('Krystian LOG: onSubmit');
      console.log("onSubmit APP");
      console.groupEnd();
    }
  };

  const onSubmit2 = () => {
    invoke('zapisDanych2', { name: zapis2, zdanie: 'Zdanie2-key' }).then(daneZapisane);
    ustawZapis2('');
    invoke('OdczytData', { zdanie: 'Zdanie2-key' }).then(ustawDane2);
    if(DEBUG==true)
    {
      console.group('Krystian LOG: onSubmit2');
      console.log("onSubmit2 APP");
      console.groupEnd();
    }
  };

  const onSubmit3 = () => {
    invoke('zapisDanych3', { name: zapis3, zdanie: 'Zdanie3-key' }).then(daneZapisane);
    ustawZapis3('');
    invoke('OdczytData', { zdanie: 'Zdanie3-key' }).then(ustawDane3);
    if(DEBUG==true)
    {
      console.group('Krystian LOG: onSubmit3');
      console.log("onSubmit3 APP");
      console.groupEnd();
    }
  };

  const zmianaObrazka = async (event) => {
    invoke('handleChangeWrite', { name: event.retrospective.value, pytania: Pytania }).then(ustawSelecta);

    if(DEBUG==true)
    {
      console.group('Krystian LOG: zmianaObrazka');
      console.log("zmianaObrazka APP");
      console.log(event);
      console.log(Pytania);
      console.groupEnd();
      console.log("zmianaObrazka: po zapisie");
    }
  }

  const usunDane   = () => {

    invoke('usunDane').then(daneUsuniete);

    if(DEBUG==true)
    {
      console.group('Krystian LOG: usunDane');
      console.log("usunDane APP");
      console.log("divChangeRetrospective "+divChangeRetrospective);
      console.log("divChangeRetrospectiveUstaw "+divChangeRetrospective);
      console.groupEnd();
    }
  }
//  ### End: Zapisy ###

  return (
    <div>
      <div className={divChangeRetrospective}>
        <Form
          onSubmit={(data) => {
          //console.log('form data', data);
            Promise.resolve(zmianaObrazka(data));
          }}
        >
        {({ formProps }) => (
          <form {...formProps}>
          <Field name="retrospective" label="Wybierz obrazek do retrospektywy sprintu">
          {({ fieldProps: { id, ...rest }, error }) => (
            <Fragment>
              <Select
              label="retrospectiv"
              inputId={id}
              options={defaultOptions}
              placeholder="Lista obrazków"
              {...rest}
              isClearable
             />
          </Fragment>
          )}
          </Field>
            <FormFooter>
              <Button type="submit" appearance="primary">
                Potwierdź wybór
              </Button>
            </FormFooter>
          </form>
        )}
        </Form>
      </div>
      <div className={divChangeRetrospective}>
      </div>
      <div className={divQuestionsAnswers}>
        <img src={obrazek}/>
        <p>
        <FormContainer>
          <FormToInput>
            <Form onSubmit={onSubmit} >
            {({ formProps }: any) => (
              <form {...formProps}>
                <Field label={Pytanie1} name="example-text">
                {({ fieldProps }: any) => (
                <Fragment>
                  <Textfield //width={400}
                  placeholder="Twoja opinia"
                  value={zapis}
                  onChange={({ target }) => ustawZapis(target.value)}
                 />
                                </Fragment>
                            )}
                        </Field>
                        <FormFooter>
                            <Button type="submit" appearance="primary">
                                Wyślij
                            </Button>
                        </FormFooter>
                    </form>
                    )}
                    </Form>
                  <div className="FormToInputGreen">
                  <Rows />
                  </div>
                </FormToInput>
                <FormToInput>
                    <Form onSubmit={onSubmit2} >
                    {({ formProps }: any) => (
                    <form {...formProps}>
                        <Field label={Pytanie2} name="example-text">
                            {({ fieldProps }: any) => (
                                <Fragment>
                                    <Textfield //width={400}
                                        placeholder="Twoja opinia"
                                        value={zapis2}
                                        onChange={({ target }) => ustawZapis2(target.value)}
                                    />
                                </Fragment>
                            )}
                        </Field>
                        <FormFooter>
                            <Button type="submit" appearance="primary" >
                                Wyślij
                            </Button>
                        </FormFooter>
                    </form>
                    )}
                    </Form>
                  <div className="FormToInputRed">
                  <Rows2 />
                  </div>
                </FormToInput>
                <FormToInput>
                    <Form onSubmit={onSubmit3} >
                    {({ formProps }: any) => (
                    <form {...formProps}>
                        <Field label={Pytanie3} name="example-text">
                            {({ fieldProps }: any) => (
                                <Fragment>
                                    <Textfield //width={400}
                                        placeholder="Twoja opinia"
                                        value={zapis3}
                                        onChange={({ target }) => ustawZapis3(target.value)}
                                    />
                                </Fragment>
                            )}
                        </Field>
                        <FormFooter>
                            <Button type="submit" appearance="primary" >
                                Wyślij
                            </Button>
                        </FormFooter>
                    </form>
                    )}
                    </Form>
                  <div className="FormToInputlightblue">
                  <Rows3 />
                  </div>
                </FormToInput>
            </FormContainer>
            </p>
            <div className="FormButton">
                <Button appearance="danger" onClick={usunDane}>Usuń dane</Button>
            </div>
            </div>

        </div>
    );
}

export default App;