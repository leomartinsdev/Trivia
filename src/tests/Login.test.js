import React from "react";
import Login from '../pages/Login'
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import userEvent from "@testing-library/user-event";
import App from '../App';
import { waitFor } from '@testing-library/react';


describe('testa si os campos estão sendo renderizados', () => {
test('btn-play', () => {
    renderWithRouterAndRedux(<Login />)
    const playBtn = screen.getByTestId('btn-play');
    expect(playBtn).toBeDisabled;
})
test('input-gravatar-email', () => {
    renderWithRouterAndRedux(<Login />)
    const input1 = screen.getByTestId('input-gravatar-email');
    expect(input1).toBeInTheDocument();
})

test('input-player-name', () => {
    renderWithRouterAndRedux(<Login />)
    const input2 = screen.getByTestId('input-player-name');
    expect(input2).toBeInTheDocument();
})

});

test('testa captura de evento', () => {
    renderWithRouterAndRedux(<Login />)
    const input1 = screen.getByTestId('input-gravatar-email');
    userEvent.type(input1, 'test');
    expect (input1.value).toBe('test');

});

test('botão Configurações direciona para a rota  /config', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsBtn = screen.getByText('Configurações');
    userEvent.click(settingsBtn);

    expect(history.location.pathname).toBe('/config');
  });


  test('É renderizado um botão "Play"', () => {
    renderWithRouterAndRedux(<App />);

    const playBtn = screen.getByText('Play');
    const settingsBtn = screen.getByText('Configurações');

    expect(playBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
  });


  test('A rota para esta página deve ser /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  
  test('testa rota do botão play ', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');

    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, 'test@hotmail.com');

    const name = screen.getByTestId('input-player-name');
    userEvent.type(name, 'Test');

    const playBtn = screen.getByTestId('btn-play');
    expect(playBtn).toBeInTheDocument();
   

    userEvent.click(screen.getByTestId('btn-play'));

    await waitFor(() =>
      expect(screen.getByTestId('header-player-name')).toBeInTheDocument()
    );
  });