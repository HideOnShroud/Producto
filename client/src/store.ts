import { create } from 'zustand'
import { ItemInterface } from './entities/ItemInterface'

interface ItemStore {
    item: ItemInterface[]
    check: boolean
    addItem: (item: ItemInterface) => Promise<void>
    getItem: () => Promise<void>
    deleteItem: (sku: string) => void
}

const useItem = create<ItemStore>((set) => ({
    item: [],
    check: false,
    addItem: async (item: ItemInterface) => {
        try {
            const response = await fetch('http://producto-app.000webhostapp.com/api/addproduct', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    // 'Content-Type': 'application/json',

                }
            })
            if (!response.ok) {
                throw new Error('Failed to add Product')
            }
            set({ check: true })
            console.log("done")
        } catch (error) {
            console.error(error)
        }
    },
    getItem: async () => {
        try {
            const response = await fetch('https://producto-app.000webhostapp.com/api/', {
                method: 'GET',
                headers: {
                    // 'Content-Type': 'application/json',


                }
            })
            if (!response.ok) {
                throw new Error('Failed to add Product')
            }
            const item: ItemInterface[] = await response.json()
            set({ item: item })
            console.log(item)
        } catch (error) {
            console.error(error)
        }
    },
    deleteItem: async (sku: string) => {
        try {
            const deleteItem = JSON.parse(`{"${"sku"}":"${sku}"}`)
            const response = await fetch('http://producto-app.000webhostapp.com/api/', {
                method: 'DELETE',
                headers: {
                    // 'Content-Type': 'application/json',
                },
                body: JSON.stringify(deleteItem),
            })
            if (response.ok) {
                await useItem.getState().getItem()
            }
        } catch (error) {
            console.error(error)
        }
    }
}))

export default useItem