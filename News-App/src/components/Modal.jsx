import React from 'react';
import Colaborators from './Colaborators';

function Modal({ isOpen, onClose }) {
  const colaborators = ['Gurottesque', 'SydMatters', 'pertinaz', 'Santiago3102', 'PMarinPy', 'JooFeBF', 'FrankiNarvaez', 'esteban23052005', 'MiguelCano-ia', 'Jeffer512', 'sebas1705sanchez', 'David9709', 'PinchaoRamiro', 'agudelo', 'AGBR121', 'birulboy', 'CamiloMunozAL', 'IsaC1B', 'JooFeBF', 'JsDGmzB27', 'JuandrezG', 'JuanF-Cano', 'juank3690', 'MateoMor', 'sebas1705sanchez', 'sefase1411', 'tania-mz', 'yeisonbetancur'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="w-11/12 max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-96" onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Colaboradores</h2>
          <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-72">
            {colaborators.map((colaborator) => (
              <Colaborators key={colaborator} colaborator={colaborator} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

