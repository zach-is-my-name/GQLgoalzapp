/// <reference types="react" />
import * as React from 'react';
import { Component } from 'react';
import { Store } from 'redux';
import ApolloClient from 'apollo-client';
export interface ProviderProps {
    store?: Store<any>;
    immutable?: boolean;
    client: ApolloClient;
}
export default class ApolloProvider extends Component<ProviderProps, any> {
    static propTypes: {
        store: React.Requireable<any>;
        client: React.Validator<any>;
        immutable: React.Requireable<any>;
        children: React.Validator<any>;
    };
    static childContextTypes: {
        store: React.Requireable<any>;
        client: React.Validator<any>;
    };
    static contextTypes: {
        store: React.Requireable<any>;
    };
    constructor(props: any, context: any);
    shouldComponentUpdate(nextProps: any): boolean;
    componentWillReceiveProps(nextProps: any): void;
    getChildContext(): {
        store: any;
        client: ApolloClient;
    };
    render(): React.ReactElement<any>;
}
