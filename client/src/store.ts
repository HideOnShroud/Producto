import { create } from 'zustand'
import { ItemInterface } from './entities/ItemInterface'

interface ItemStore {
    item: ItemInterface[]
    addItem: (item: ItemInterface) => Promise<boolean>
    getItem: () => Promise<void>
    deleteItem: (sku: string) => void
}

const useItem = create<ItemStore>((set) => ({
    item: [],
    addItem: async (item: ItemInterface) => {
        try {
            const response = await fetch('http://localhost:8000/api/addproduct', {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    // 'Content-Type': 'application/json',

                }
            })
            if (!response.ok) {
                throw new Error('Failed to add Product')
            }
            console.log("done")
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    },
    getItem: async () => {
        try {
            const response = await fetch('http://localhost:8000/api/', {
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
            const response = await fetch('http://localhost:8000/api/', {
                method: 'DELETE',
                headers: {
                    // 'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sku }),
            })
            if (!response.ok) {
                throw new Error('Failed to delete product')
            }
        } catch (error) {
            console.error(error)
        }
    }

}))

export default useItem