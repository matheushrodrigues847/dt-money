interface BalanceType{
    text: string,
    src: string,
    value: string,
    background?: string
    color?: string
    hifen?: string
}

export function Balance(props: BalanceType){
    return(
        <div style={{background: props.background, color: props.color}}>
            <header>
               <p>{props.text}</p>
               <img src={props.src} alt={props.text} />
            </header>
            <strong>{props.hifen}{
                new Intl.NumberFormat('pt-BR',{ 
                    style: 'currency',currency: 'BRL'
    
                }).format(Number(props.value))}
            </strong>
        </div>
    );
}