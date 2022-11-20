import { useState, useEffect } from 'react';
import {FiPlus, FiSearch} from 'react-icons/fi';
import {Container, Brand, Menu, Search, Content, NewNote} from './styles';
import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import {Header} from '../../components/Header';
import {Note} from '../../components/Note';
import {Section} from '../../components/Section';
import {Input} from  '../../components/Input';
import {ButtonText} from '../../components/ButtonText';


export function Home(){
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleNotes(){
        navigate("/new")
    }

    function handleTagsSelected(tagName){
        if(tagName === "all"){
            return  setTagsSelected([])
        }

        const alredySelected = tagsSelected.includes(tagName);
        

        if(alredySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);
        }else {
            setTagsSelected(prevState => [...prevState, tagName])
        }
    }

    function handleDatails(id){
        navigate(`/details/${id}`);
    }

    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags")
            setTags(response.data)
        }

        fetchTags();
    }, [])

    useEffect(() => {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();

    },[tagsSelected, search])

    return(
        <Container>
            <Brand>
                <h1>AlredyNotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                <ButtonText 
                title="Todos" 
                onClick={() => handleTagsSelected("all")}
                isActive={tagsSelected.length === 0}
                />
                </li>
                {   
                tags && tags.map(tag => (
                 <li key={String(tag.id)}>
                <ButtonText 
                title={tag.name} 
                onClick={() => handleTagsSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)}
                />
                </li>
                ))
                    
                }  
            </Menu>

            <Search>
               <Input placeholder="Pesquise pelo o titulo" 
               onChange={(e) => setSearch(e.target.value)}
               icon={FiSearch}
               />     
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                    notes.map(note => (
                    <Note 
                        key={String(note.id)}
                        data={note}
                        onClick={() => handleDatails(note.id)}
                         /> 
                     ))
                    }
                </Section>
            </Content>

            <NewNote onClick={handleNotes}>
                <FiPlus />
                    Criar nota
                
            </NewNote>

        </Container>
    )
}
