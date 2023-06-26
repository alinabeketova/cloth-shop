import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import { IProducts } from '../models';

export function useProducts() {
    const [products, setProducts] = useState<IProducts[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function addProduct(product: IProducts) {
        setProducts(prev =>[...prev, product])
    }


    async function fetchProducts() {
        try{
        setLoading(true)
        const response = await axios.get<IProducts[]>('https://fakestoreapi.com/products?limit=5')
        setProducts(response.data)
        setLoading(false)
        } catch (e: unknown) {
        const error = e as AxiosError
        setLoading(false)
        setError(error.message)
        }
    }

    useEffect( () => {
        fetchProducts()
    }, [])

    return{ products, error, loading, addProduct }
}