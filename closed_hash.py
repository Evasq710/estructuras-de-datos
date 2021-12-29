class Hash_Cerrado():
    def __init__(self, m: int, min: int, max: int):
        self.m = m
        # Para el rehashing, mínimo del nuevo valor de la tabla en base al max (PORCENTAJES)
        self.min = min
        # máximo de valores a los que puede llegar antes del rehashing (PORCENTAJES)
        self.max = max
        self.init_lista()
    
    def init_lista(self):
        # Cantidad de elementos guardados
        self.n = 0
        # Tamaño self.m
        self.h = []
        for i in range(self.m):
            # para indicar las posiciones vacías
            self.h.append(-1)
    
    def insertar(self, k):
        posicion = self.division(k)
        while self.h[posicion] != -1:
            # colisión
            # probar la siguiente posición
            posicion = self.linear(posicion)
        self.h[posicion] = k
        self.n += 1
        # probando el rehashing, para ver si se llegó al máximo de datos permitido
        self.rehashing()        
    
    def division(self, k):
        # retorna la posición que le corresponde a la clave en la tabla hash
        return k%self.m
    
    # Al ser cerrado de direccionamiento abierto, las colisiones se resuelven por medio de esta prueba
    # Las posiciones aumentan en 1, hasta que encuentre una posición vacía
    def linear(self, k):
        return (k+1)%self.m
    
    def rehashing(self):
        if self.n*100/self.m >= self.max:
            print("Haciendo rehashing, se llegó al máximo")
            copia_h = self.h.copy()
            self.print_tabla()
            # rehashing
            copia_m = self.m
            # Recalculando el nuevo tamaño de la tabla hash, e iniciando la tabla
            self.m = int(self.n*100 / self.min)
            self.init_lista()
            for i in range(copia_m):
                if copia_h[i] != -1:
                    self.insertar(copia_h[i])
        else:
            self.print_tabla()
    
    def print_tabla(self):
        print("[", end="")
        for i in range(self.m):
            print(f" {self.h[i]}", end="")
        print(f" ] {self.n*100/self.m}% ocupado")

new_tabla_hash = Hash_Cerrado(m=5, min=20, max=80)
new_tabla_hash.insertar(5)
new_tabla_hash.insertar(10)
new_tabla_hash.insertar(15)
new_tabla_hash.insertar(20)
new_tabla_hash.insertar(25)
new_tabla_hash.insertar(30)